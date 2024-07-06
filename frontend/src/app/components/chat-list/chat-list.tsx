import styles from "./chat-list.module.css";
function ChatItem() {
    return (
        <li className={styles.item} data-chat="668144e920bf5b9d20163c42">
            <img className={styles.img} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg"/>
            <span className={styles.name}>Thomas Bangalter</span>
            <span className={styles.time}></span>
            <span className={styles.preview}></span>
        </li>
    )
}

export default function ChatList() {
    return (
        <ul id="chatList" className={styles.list}>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
            <ChatItem/>
        </ul>
    )
}
