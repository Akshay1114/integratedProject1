import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, doc, getDocs, updateDoc, addDoc,collection, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

console.log("Welcome");

const firebaseConfig = {
    apiKey: "AIzaSyAHfgjdQt1-c6zdrTI-WuaEn9j9GlKuwtM",
    authDomain: "wndd-8df00.firebaseapp.com",
    projectId: "wndd-8df00",
    storageBucket: "wndd-8df00.appspot.com",
    messagingSenderId: "437665404349",
    appId: "1:437665404349:web:04f94757ceda54104beed4",
    measurementId: "G-54Y9RBZJJ9"
  };

  const app = initializeApp(firebaseConfig); // ver. 9&+ modular

const db = getFirestore(app); // ver. 9&+ modular

console.log(db !== undefined);

const DB_NAME = 'wndd';

var todoForm = document.getElementById('todo-form');
todoForm.addEventListener('submit', addTodo); //benefits from validation

async function addTodo(e) {
    e.preventDefault();
  console.log('addTodo called');
  const todoName = document.getElementById('firstName').value;
  const dueValue = document.getElementById('lastName').value;
//   addDoc( collection( db , <collection name > ) , <object to add> );
  // use firestore API to add a document to DB_NAME collection 
//   updateDoc( doc( db , <collection name > , <doc id> ) , { field : value, ... } );
try{
    const docRef = await addDoc(collection(db, "TestCollection"), {
        firstName: todoName,
        lastName: dueValue,
        active: true
      });
      console.log('Document written with ID: ', docRef.id);
      let todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';
      getTodos()
} catch(err){
    console.error(err);

}

}

async function getTodos() {
    console.log('getTodos called');
    const querySnapshot = await getDocs(collection(db, "TestCollection"));
    let todoList = document.getElementById('todo-list');
    querySnapshot.forEach(async(data) => {
        console.log(`${data.data()} => ${data.data().firstName}`);
let li = document.createElement('li');
li.innerHTML = `${data.data().firstName} ${data.data().lastName} <button id="${data.id}" onclick="deleteTodo(this.id)">Delete</button> <button id="${data.id}" onclick="updateTodo(this.id)">Update</button>`;
todoList.appendChild(li);
const id = data.id;
let getDel = document.getElementById(id);
getDel.addEventListener('click', async function() {
    console.log('delete Button clicked');
    console.log('deleteTodo called');
    console.log(id);
    await deleteDoc(doc(db, "TestCollection", id));
    todoList.innerHTML = '';
    getTodos()
    });
    });
}
getTodos()

