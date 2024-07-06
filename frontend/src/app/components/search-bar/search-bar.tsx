import styles from "./search-bar.module.css";
export default function SearchBar() {
    return (
        <div className={styles.container}>
            <input className={styles.input} type="text" placeholder="Search"/>
            <a href="javascript:;" className={styles.search}></a>
        </div>
    )
}
