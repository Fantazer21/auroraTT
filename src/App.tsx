import styles from "./app.module.scss"
import {observer} from "mobx-react-lite";
import Store from "./bll/store";
import Message from "./ui/message/Message";
import {useEffect, useState} from "react";
import Loader from "./ui/loader/Loader";

function App() {
    const [inputValue, setInputValue] = useState("")

    const sendMessage = (ev: string) => {
        Store.addMessage()
    }

    useEffect(() => {
        Store.getUsers()
    }, [])
    return (

        Store.loaderStatus ?
            <div className={styles.loaderWrapper}>
                <Loader/>
            </div>
            :
            <div className={styles.appWrapper}>
                <div className={styles.messagesWrapper}>
                    {
                        Store.loaderStatus
                            ? <div className={styles.skeletonLoaderGradient}></div>
                            :

                            <input value={inputValue}
                                   onBlur={() => sendMessage(inputValue)}
                                   onChange={(e) => setInputValue(e.target.value)}
                                   className={styles.inputWrapper}
                                   placeholder="Напишите что нибудь ...."
                            />
                    }
                    {
                        !Store.loaderStatus && Store.messages.filter((mes) => mes.replyTo === 0).map(message => {
                            return <Message
                                key={message.id}
                                author={message.author}
                                timestamp={message.timestamp}
                                message={message.message}
                                id={message.id}
                            />
                        })
                    }

                </div>
            </div>

    )
}

export default observer(App)
