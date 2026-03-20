import styles from "./chat-list.module.css";
// todo types
function ChatItem({chatInfo}) {
    return (
        <li className={styles.item} data-chat="668144e920bf5b9d20163c42">
            <img className={styles.img} src={chatInfo.avatar} alt='avatar'/>
            <span className={styles.name}>{chatInfo.name}</span>
            <span className={styles.time}></span>
            <span className={styles.preview}></span>
        </li>
    );
}

export default async function ChatList() {
    try {
        const chatList = await getChatList();
        const chatListItems = chatList.map((item: any) => <ChatItem key={item.id} chatInfo={item}/>);
    
        return (
            <ul id="chatList" className={styles.list}>
                {chatListItems}
            </ul>
        );
    } catch (error) {
        console.error('Error fetching chat list', error);
        return <div>Error fetching chat list</div>;
    }
}

async function getChatList() {
    const res = await fetch('http://localhost:3000/v1/api/chats');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
