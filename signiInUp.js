import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore ,collection, addDoc,getDocs,doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeLwbNthXq2WVDxS4nkEN43DEL6Xx5HDY",
  authDomain: "myprject-1.firebaseapp.com",
  projectId: "myprject-1",
  storageBucket: "myprject-1.appspot.com",
  messagingSenderId: "965807283273",
  appId: "1:965807283273:web:6e931675bca22e17867398",
  measurementId: "G-J5X22KDJBY"
};

// initialize of things which we are importing
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
///////////////////////////////////////////////////////////////////////

// loader
var loader=document.getElementById("loader");
loader.style.display="none";

var mainDisplay=document.getElementById("main-display");
// mainDisplay.style.display="none";





//SignUP

let signuoButton=document.getElementById("Sign-up");

// //SignUp data from html + firebase sign up

let signupUser =()=>{

// Taking user data from html and storing in object
let username=document.getElementById("fullname").value;
let userphone=document.getElementById("phonenumber").value;
let useremail=document.getElementById("email").value;
let userpassword=document.getElementById("password").value;

// user object

// conditions

if(username==""){
    console.log("User Password is less then 8 digits")
    Swal.fire({
        icon: 'error',
        text: 'Please enter full name',
    })
   
}
else if(userpassword.length<8){
    Swal.fire({
        icon: 'error',
        text: 'Password limit is of 8 Digits!',
    })
}
else{
let userprofile={
name:username,
phone:userphone,
email:useremail,
password:userpassword
}
console.log("userobject",userprofile)

// sign up through firebase

createUserWithEmailAndPassword(auth,userprofile.email,userprofile.password)
  .then(async(userCredential) => {
    const user = userCredential.user; 
    console.log("user made at sign up",user);
    mainDisplay.style.display="none";
    loader.style.display="flex";

    // storing in database
    // for storing data with auto generated ref id

    try {

 
      await setDoc(doc(db, "users",user.uid,), {
        ...userprofile,
         uid:user.uid,

        
      });
     
      localStorage.setItem("ReferenceID",user.uid);
      localStorage.setItem("username",username);
      console.log("Refrence ID is stored")
      console.log("Document written with ID: ", user.uid);
      

      
    } catch (e) {
      console.error("Error adding document: ", e);
      Swal.fire({
        icon: 'error',
        text: e,
    })
    }
    console.log("user firebase made at sign up",user);
    window.location.href="myblogs.html";
  
  })

  // error of creating user

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Sign Up Error",errorMessage);
    Swal.fire({
        icon: 'error',
        text: errorMessage,
    })
  });
}
}
signuoButton&&signuoButton.addEventListener("click",signupUser)
//////////////////////////////////////////////////////////////////////////////////

//Sign In

let signinButton=document.getElementById("signinbtn");

// //SignUp data from html + firebase sign up

let signinUser = async ()=>{

// Taking user data from html and storing in object

let signinUseremail=document.getElementById("signinemail").value;
let signinUserpassword=document.getElementById("signinpassword").value;


// sign in through firebase
await signInWithEmailAndPassword(auth, signinUseremail,signinUserpassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User which is signed in ",user)
    window.location.href="myblogs.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error of sign in",errorMessage)
    Swal.fire({
        icon: 'error',
        text: errorMessage,
    })
  });
}
signinButton&&signinButton.addEventListener("click",signinUser)
/////////////////////////////////////////////////////////////////////////////////


