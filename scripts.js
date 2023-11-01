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
    messages.innerHTML += `<li class="message">${value}</li>`
}

sendButton.addEventListener("click" ,function(){
    let message = messageInput.value 
    if (message){
        push(MessagesDB,message)
        messageInput.value = ""
    }

})

