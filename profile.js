import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, addDoc, collection,getDoc,doc,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getStorage,ref,uploadBytes,uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCeLwbNthXq2WVDxS4nkEN43DEL6Xx5HDY",
    authDomain: "myprject-1.firebaseapp.com",
    projectId: "myprject-1",
    storageBucket: "myprject-1.appspot.com",
    messagingSenderId: "965807283273",
    appId: "1:965807283273:web:6e931675bca22e17867398",
    measurementId: "G-J5X22KDJBY"
  };
  

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// 
//Sign out user

let bloglogout=document.getElementById("blog-logout-button");
bloglogout.addEventListener("click",()=>{
console.log("he;;o")
// const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
//   console.log("User Sign Out from firebase")
//   window.location.href="index.html";
// }).catch((error) => {
//   // An error happened.
// });

})

var ReferenceFrLocalSt=localStorage.getItem("ReferenceID");


// Reading data
const readData=async()=>{

   
    console.log(ReferenceFrLocalSt)
    const docRef = doc(db, "users", ReferenceFrLocalSt);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      
      console.log("Document data:", docSnap.data());
      console.log(docSnap.data().name);
      let username=docSnap.data().name;
      let userphone=docSnap.data().phone;
      let useremail=docSnap.data().email;
      document.getElementById("user-name").innerHTML=username
      document.getElementById("user-email").innerHTML=useremail
      document.getElementById("user-phone").innerHTML=userphone
      if(docSnap.data().pic==undefined){

      }
      else{
        console.log("Picture exsits");
        console.log("Picture link",docSnap.data().pic);
        let  userpic=docSnap.data().pic;
        document.getElementById("user-upated-pic").src=`${userpic}`;
      }
    }

}
readData();


// updating Data

const updateData=async()=>{
    let updateName=document.getElementById("Name").value;
    let updatephone=document.getElementById("Phone").value;
    let file=document.getElementById("fileinput").files[0];
    console.log(updateName);
    console.log(updatephone);
    console.log(file);
    var res= await uploadFile(file);
    console.log(res)
    // Updating in database
const docRef = doc(db, "users",ReferenceFrLocalSt);

// Set the "capital" field of the city 'DC'
await updateDoc(docRef, {
       name:updateName,
       phone:updatephone,
       pic:res
  
});
console.log("Data Updated")
readData();
}

let updatebtn=document.getElementById("Update-btn")
updatebtn&&updatebtn.addEventListener("click",updateData)


/////////////////////////////////////////////////////////////////////

// upload file
function uploadFile(file){

    return new Promise((resolve,reject)=>{
    // Storing file in Storage with name here file is let file=document.getElementById("fileinput").files[0];
    // so we just have to give file in function 
    
    const mountainImagesRef = ref(storage, `images/${file.name}`);
    
    // Storing in data base with url return
    
    const uploadTask = uploadBytesResumable(mountainImagesRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        reject(error);
      }, 
      
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // It will return URL Function which is using it must store its response
          resolve( downloadURL);
        });
         }
    );
    
    })
    }
/////////////////////////////////////////////////////////