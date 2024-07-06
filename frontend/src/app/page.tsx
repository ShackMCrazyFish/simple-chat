import Image from "next/image";
import styles from "./page.module.css";
import SearchBar from "@/app/components/search-bar/search-bar";
import ChatList from "@/app/components/chat-list/chat-list";
import Chat from "@/app/components/chat/chat";

export default function Home() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <SearchBar/>
                    <ChatList/>
                </div>
                <div className={styles.right}>
                    <Chat/>
                </div>
            </div>
        </div>
    );
}
