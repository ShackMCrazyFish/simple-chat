import styles from "./chat.module.css";
import MessageBoard from "@/app/components/message-board/message-board";
import MessageInput from "@/app/components/message-input/message-input";

function Title() {
    return (
        <div className={styles.top}><span>To: <span className="name">Dog Woofson</span></span></div>
    )
}

export default function Chat() {
    return (
        <>
            <Title/>
            <MessageBoard/>
            <MessageInput/>
        </>
    )
}
