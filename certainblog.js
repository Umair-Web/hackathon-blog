// loader
var loader=document.getElementById("loader");
// loader.style.display="none";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore ,collection, addDoc,getDocs,doc, setDoc,query,where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeLwbNthXq2WVDxS4nkEN43DEL6Xx5HDY",
  authDomain: "myprject-1.firebaseapp.com",
  projectId: "myprject-1",
  storageBucket: "myprject-1.appspot.com",
  messagingSenderId: "965807283273",
  appId: "1:965807283273:web:6e931675bca22e17867398",
  measurementId: "G-J5X22KDJBY"
};
// loader
var loader=document.getElementById("loader");
// loader.style.display="none";

// initialize of things which we are importing
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Log in Blog Website
let bloglogin=document.getElementById("blog-login-button");
bloglogin.addEventListener("click",()=>{
window.location.href="login.html";

})
// SignUp in Blog Website
let blogSignup=document.getElementById("blog-signup-button");
blogSignup.addEventListener("click",()=>{
window.location.href="signup.html";
})

//Greetings
let greetings = document.getElementById("greeting-content")


var currentDate = new Date();
var currentHour = currentDate.getHours();

console.log(currentHour)
let greeting;

if (currentHour < 12) {
  greeting = "Good Morning Reader!!!";
} else if (currentHour < 18) {
  greeting = "Good Afternoon Reader!!!";
} else if (currentHour < 22) {
  greeting = "Good Evening Reader!!!";
} else {
  greeting = "Good Night Reader!!!";
}

greetings.innerHTML += (
`<p >${greeting}</p>`   
)

let allMainData=document.getElementById("main-blogs-specific");
let specificuserID=localStorage.getItem("allblogsuserid");
console.log(specificuserID)
// Getting data from firebase and writig it

let getData=async()=>{
 
    let collectionarray=[]
    let sortedcollectionarray=[]
    
      const q = query(collection(db, "blogs"), where("userid", "==", specificuserID));
    
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        collectionarray.push(doc.data());
        console.log(collectionarray.length)
        console.log(collectionarray)
        
    
      } );
      console.log(collectionarray)
      for(var i=0;i<collectionarray.length;i++){
       if(collectionarray[i].userid==specificuserID){
        sortedcollectionarray.push(collectionarray[i])
        console.log("sortedcollection",sortedcollectionarray)
       }
       else{
        console.log("Error is not sorted")
       }
    
      }
      loader.style.display="none";
    for(var j=0;j<sortedcollectionarray.length;j++){
    console.log(sortedcollectionarray[j])
    allMainData.innerHTML +=`
    
    <div class="card" style="width: 100%;margin-top: 20px;">
    <div class="card-body blogs-cards">
      <div class="card-header d-flex">
        <div>
            <img src="images/male.webp" alt="" id="blog-image" class="img-fluid">
        </div>
         <div style="margin-left: 20px;margin-top: 20px;"> 
            <h5 class="card-title" id="blog-title"> ${sortedcollectionarray[j].title}</h5>
            <h6 class="card-subtitle mb-2 text-muted"><span id="blogger-name">${sortedcollectionarray[j].name}</span> <span id="blogger-date">${sortedcollectionarray[j].time}</span></h6>
        </div>
        
      </div>
     
      <p class="card-text" id="blog-content">${sortedcollectionarray[j].content}</p>
    
    </div> `
    
    }
    
    }
    getData()