// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyDUVhUoA32x4j5zzpfYJTPE00VLGu1O1H0",
//   authDomain: "fir-test-15b1d.firebaseapp.com",
//   projectId: "fir-test-15b1d",
//   storageBucket: "fir-test-15b1d.appspot.com",
//   messagingSenderId: "429020393486",
//   appId: "1:429020393486:web:28490083a615e358700c5f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

// let signupbtn = document.getElementById("signupbtn");
// signupbtn.addEventListener("click",function(){
//   let email = document.getElementById("email");
//   let password = document.getElementById("password");

//   createUserWithEmailAndPassword(auth, email.value, password.value)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     console.log("user==>", user)

//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("error==>", errorMessage);
//   });
// });

// // ------login-----

// let Login=document.getElementById("Login")

// Login.addEventListener("click",async()=>{

//   let loginEmail=document.getElementById("loginEmail")
//   let LoginPass=document.getElementById("LoginPass")

//   await signInWithEmailAndPassword(auth, loginEmail.value, LoginPass.value)
// .then((userCredential) => {
//   // Signed in 
//   const user = userCredential.user;
//   console.log("user==>", user)
//   alert("Susessfully sign in")
//   window.location.href ="./dashboard1.html"
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log("error==>", errorMessage);
// });
// })



// <!-- Firebase Script -->
// <script type="module">
  // Import Firebase modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDUVhUoA32x4j5zzpfYJTPE00VLGu1O1H0",
    authDomain: "fir-test-15b1d.firebaseapp.com",
    projectId: "fir-test-15b1d",
    storageBucket: "fir-test-15b1d.appspot.com",
    messagingSenderId: "429020393486",
    appId: "1:429020393486:web:28490083a615e358700c5f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app); // Initialize Firestore

  // ---- Sign-Up Logic for Admin ----
  let signupbtn = document.getElementById("signupbtn");
  signupbtn.addEventListener("click", async function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
      // Create a new user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the user's role as 'admin' in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: "admin"  // Assign role as 'admin'
      });

      console.log("Admin user created:", user);
      alert("Admin successfully signed up");
    } catch (error) {
      console.log("Error during sign-up:", error.message);
    }
  });

  // ---- Login Logic for Admin ----

  let Login = document.getElementById("Login");
  Login .addEventListener("click", async () => {
    let loginEmail = document.getElementById("loginEmail").value;
    let LoginPass = document.getElementById("LoginPass").value;

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, LoginPass);
      const user = userCredential.user;

      // Retrieve the user's role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") {
          console.log("Admin logged in:", user);
          alert("Successfully signed in as admin");
         window.location.href = "./ADMINdashboard.html"; // Redirect to admin dashboard
        } else {
          alert("Access denied. You are not authorized to log in as an admin.");
        }
      } else {
        console.log("No user document found");
      }
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  });

 // document.getElementById('Login').onclick = function() {
    // document.getElementsById('loader').style.display = 'block';
    // setTimeout(function() {
    // }, 2000);
    // window.location.href = 'ADMINdashboard.html';
    // alert("Successfully signed in as admin");
 // };

 document.getElementById('Login').onclick = function() {
    // Show the loader
   // document.getElementById('loader').style.display = 'block';

    // Delay for 2 seconds before redirecting
    //setTimeout(function() {
        // Redirect to the dashboard
        window.location.href = 'ADMINdashboard.html';

        // Show success message after redirect
        alert("Successfully signed in as admin");
   // }, 2000); // Delay in milliseconds (2000ms = 2 seconds)
};
