(function() {
    const serverAddr = 'http://localhost:3000';
    const messageForm = document.getElementById('message-form');
    const messageTextarea = document.getElementById('mess');
    const messageList = document.getElementById('messageList');

    function renderMessages() {
        messageList.innerHTML = '';

        fetch(serverAddr)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((message) => {
                    const li = document.createElement('li');
                    li.innerText = message.text ?? message.mess;
                    messageList.appendChild(li);
                });
            });
    }

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        fetch(serverAddr, {
            body: JSON.stringify({ mess: messageTextarea.value }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        }).then(() => {
            messageTextarea.value = '';
            renderMessages();
        });

    });

    renderMessages();
})()
