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

// initialize of things which we are importing
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

///////////////////////////////////////////////////////////////////////



//Sign out user

let bloglogout=document.getElementById("blog-logout-button");
bloglogout.addEventListener("click",()=>{

const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  console.log("User Sign Out from firebase")
  window.location.href="index.html";
}).catch((error) => {
  // An error happened.
});

})
/////////////////////////////////////////////////////////


// Getting Current date
let currentDate = new Date();
let year = currentDate.getFullYear();  
let month = currentDate.getMonth() + 1; 
let day = currentDate.getDate();
let formattedDate = `${month}-${day}-${year}`;
console.log(formattedDate);

// Getting abd setting data of blogger
let userUID=localStorage.getItem("ReferenceID")
let BloggerName=document.getElementById("blogger-name");
let Username=localStorage.getItem("username");
console.log(Username)
console.log(BloggerName)
BloggerName.innerHTML=Username;
console.log(BloggerName)

BloggerName.addEventListener("click",()=>{
  window.location.href="profile.html"
})
//Setting Data From Fields

let allData=document.getElementById("all-blogs");

//////////////////////////////////////////////////////////////////
// Pushing Data

let PublishData=document.getElementById("blog-publish");
PublishData.addEventListener("click",async()=>{

try{
// Getting User Input Data nad strong in firebase



  let inputtitle=document.getElementById("exampleFormControlInput1").value;
  let inputcontent=document.getElementById("exampleFormControlTextarea1").value;
  
  console.log(inputtitle);
  console.log(inputcontent)

  try {
    console.log("user has gotten the data")

    const docRef = await addDoc(collection(db, "blogs"), {
      title: `${inputtitle}`,
      content: `${inputcontent}`,
      time: formattedDate,
      name:Username,
      userid:userUID
    });
    console.log("Document written with ID: ", docRef.id);
    console.log("Data stored in firebase")
    getData()
    location.reload();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  

  
}
catch(e){
  console.error("Input data Error", e);

}
})


// Getting data from firebase and writig it

let getData=async()=>{
  
let collectionarray=[]
let sortedcollectionarray=[]
console.log(userUID)
  const q = query(collection(db, "blogs"), where("userid", "==", userUID));

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
   if(collectionarray[i].userid==userUID){
    sortedcollectionarray.push(collectionarray[i])
    console.log("sortedcollection",sortedcollectionarray)
   }
   else{
    console.log("Error is not sorted")
   }

  }
for(var j=0;j<sortedcollectionarray.length;j++){
console.log(sortedcollectionarray[j])
allData.innerHTML +=`

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
  <div class="">
    <button class="btn btn-outline-success" type="submit" id="blog-update">Update</button>
    <button class="btn btn-outline-success" type="submit" id="blog-delete">Delete</button>
</div>
</div> `

}

}
getData()



