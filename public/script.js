(async function(){
    let chats = await fetch('http://localhost:3000')
        .then(response => response.json())
        .then(data => data);

    chats.forEach((chat) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const name = document.createElement('span');
        name.textContent = chat.name;
        name.classList.add('name');

        const time = document.createElement('span');
        time.classList.add('time');

        const preview = document.createElement('span');
        preview.classList.add('preview');
        img.src = chat.avatar;
        li.classList.add('person');
        li.dataset.chat = chat._id;
        li.appendChild(img);
        li.appendChild(name);
        li.appendChild(time);
        li.appendChild(preview);
        console.log(li)
        document.getElementById('chatList').appendChild(li);
    });
    console.log(chats[1]._id)
    document.querySelector(`.chat[data-chat="${chats[1]._id}"]`).classList.add('active-chat')
    document.querySelector('.person[data-chat=person2]').classList.add('active')

    let friends = {
            list: document.querySelector('ul.people'),
            all: document.querySelectorAll('.left .person'),
            name: ''
        },
        chat = {
            container: document.querySelector('.container .right'),
            current: null,
            person: null,
            name: document.querySelector('.container .right .top .name')
        }

    friends.all.forEach(f => {
        f.addEventListener('mousedown', () => {
            f.classList.contains('active') || setActiveChat(f)
        })
    });

    function setActiveChat(f) {
        friends.list.querySelector('.active').classList.remove('active')
        f.classList.add('active')
        chat.current = chat.container.querySelector('.active-chat')
        chat.person = f.getAttribute('data-chat')
        chat.current.classList.remove('active-chat')
        chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat')
        friends.name = f.querySelector('.name').innerText
        chat.name.innerHTML = friends.name
    }
})()
