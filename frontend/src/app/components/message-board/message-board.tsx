import styles from "./message-board.module.css";
export default function MessageBoard() {
    return (
        <div className={`${styles.board} ${styles.board_active}`} data-chat="person1">
            <div className={styles.conversationStart}>
                <span>Today, 6:48 AM</span>
            </div>
            <div className={`${styles.bubble} ${styles.you}`}>
                Hello,
            </div>
            <div className={`${styles.bubble} ${styles.you}`}>
                it's me.
            </div>
            <div className={`${styles.bubble} ${styles.you}`}>
                I was wondering...
            </div>
            <div className={`${styles.bubble} ${styles.me}`}>
                Hello!
            </div>
        </div>
    )
}
