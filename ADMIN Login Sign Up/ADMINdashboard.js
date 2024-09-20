// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHy-XPOzJ4NdmjAf-ID8CopxrGEbBbZ40",
    authDomain: "hackathone24.firebaseapp.com",
    projectId: "hackathone24",
    storageBucket: "hackathone24.appspot.com",
    messagingSenderId: "1099465789971",
    appId: "1:1099465789971:web:43298d19d569e377fd25e6",
    measurementId: "G-ZJQCVXC6X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login function
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    console.log("Attempting to log in with:", email);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful:", userCredential);
        if (email === 'admin@example.com') {
            showAdminPortal();
        } else {
            showStudentPortal();
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Invalid credentials: ' + error.message);
    }
}

// Show admin portal
function showAdminPortal() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('admin-portal').classList.remove('hidden');
}

// Show student portal
function showStudentPortal() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('student-portal').classList.remove('hidden');
}

// Add student function
async function addStudent(event) {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cnic = document.getElementById('cnic').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, 'students', uid), {
            firstName,
            lastName,
            cnic,
            userType: 'Student'
        });
        alert('Student added successfully!');
    } catch (error) {
        alert('Error adding student: ' + error.message);
    }
}

// Upload marks function
async function uploadMarks(event) {
    event.preventDefault();
    const course = document.getElementById('course').value;
    const studentId = document.getElementById('student-id').value;
    const marks = parseInt(document.getElementById('marks').value);
    const totalMarks = parseInt(document.getElementById('total-marks').value);
    const grade = document.getElementById('grade').value;

    try {
        await setDoc(doc(db, 'marks', studentId), {
            course,
            studentId,
            marks,
            totalMarks,
            grade
        });
        alert('Marks uploaded successfully!');
    } catch (error) {
        alert('Error uploading marks: ' + error.message);
    }
}

// Edit profile function
async function editProfile(event) {
    event.preventDefault();
    const cnic = document.getElementById('edit-cnic').value;
    const firstName = document.getElementById('edit-first-name').value;
    const lastName = document.getElementById('edit-last-name').value;

    try {
        const user = auth.currentUser;
        if (user) {
            await updateDoc(doc(db, 'students', user.uid), {
                cnic,
                firstName,
                lastName
            });
            alert('Profile updated successfully!');
        }
    } catch (error) {
        alert('Error updating profile: ' + error.message);
    }
}

// Get result function
async function getResult(event) {
    event.preventDefault();
    const cnic = document.getElementById('result-cnic').value;

    try {
        const q = query(collection(db, 'marks'), where('studentId', '==', cnic));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            alert('No results found for this CNIC');
            return;
        }

        let results = '';
        querySnapshot.forEach(doc => {
            const data = doc.data();
            results += `Course: ${data.course}, Marks: ${data.marks}/${data.totalMarks}, Grade: ${data.grade}\n`;
        });
        alert(results);
    } catch (error) {
        alert('Error fetching results: ' + error.message);
    }
}
