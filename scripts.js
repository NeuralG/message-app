import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3cdb5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const MessagesDB = ref(database, "MesajDeneme")


const sendButton = document.getElementById("send-button")
const messageInput = document.getElementById("message-input")
const nameInput = document.getElementById("name-input")
const messages = document.getElementById("messages")

onValue(MessagesDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.values(snapshot.val())
        messages.innerHTML = ""
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendItemToMessages(currentItem)
        }    
    } else {
        messages.innerHTML = "No messages here... yet"
    }
})

function appendItemToMessages(value){
    let messageEl = document.createElement("li");
    messageEl.classList.add("message");
    messageEl.textContent = value;
    messages.appendChild(messageEl)
}

sendButton.addEventListener("click" ,function(){
    let message = messageInput.value
    let name =  nameInput.value
    let output = name + ": " + message
    if (message && name){
        push(MessagesDB,output)
        messageInput.value = ""
    }

})

messageInput.addEventListener("keypress" ,function(event){

    if (event.key === "Enter") {
        event.preventDefault()
        let message = messageInput.value
        let name =  nameInput.value
        let output = name + ": " + message
        if (message && name){
            push(MessagesDB,output)
            messageInput.value = ""
    }}

})


