function sendMessage() {
    let input = document.getElementById("chatInput");
    let message = input.value.trim();

    if (message !== "") {
        let chatBox = document.getElementById("chat-messages");
        let newMessage = document.createElement("p");
        newMessage.innerHTML = `<strong>You:</strong> ${message}`;
        chatBox.appendChild(newMessage);
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
