import styles from "./message-input.module.css";
export default function MessageInput() {
    return (
        <div className={styles.write}>
            <a href="javascript:;" className={`${styles.writeLink} ${styles.attach}`}></a>
            <input type="text"/>
            <a href="javascript:;" className={`${styles.writeLink} ${styles.smiley}`}></a>
            <a href="javascript:;" className={`${styles.writeLink} ${styles.send}`}></a>
        </div>
    )
};
