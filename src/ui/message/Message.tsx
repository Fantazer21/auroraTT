import React from 'react';
import styles from "./message.module.scss"
import Heart from "../../assets/Heart.svg";
import Comment from "../../assets/ArrowS.svg";
import Arrow from "../../assets/Message.svg";
import Eye from "../../assets/iconEye.svg";
import Person from "../../assets/person1.png";
import Person2 from "../../assets/person2.png";
import {observer} from 'mobx-react-lite';
import Store from "../../bll/store";

type MessageType = {
    author: string
    message: string
    timestamp: number
    id: number
}

const Message = ({author, message, timestamp, id}: MessageType) => {

    const authorName = Store.users.find(user => user.id === author)?.name
    const surnameName = Store.users.find(user => user.id === author)?.surname


    const decoderComments = (value: string) => {
        const name = Store.users.find(user => user.id === value)?.name
        const surName = Store.users.find(user => user.id === value)?.surname
        return `${name} ${surName}`

    }

    function timeConverter(UNIX_timestamp: number) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
        return time;
    }

    return (
        <div key={id} className={styles.messageWrapper}>
            <div className={styles.messageHeaderWrapper}>
                <div className={styles.messageHeaderLeftSection}>
                    <div>
                        <img style={{borderRadius: "50px", width: "70px", height: "70px"}}
                             className={styles.imageWrapper} src={Person}/>
                    </div>
                    <div className={styles.headerContent}>
                        <div
                            className={styles.headerContentName}>{decodeURIComponent(String(authorName))} {decodeURIComponent(String(surnameName))}</div>
                        <div className={styles.headerContentDate}>{timeConverter(timestamp)}</div>
                    </div>
                </div>
                <div className={styles.messageHeaderRightSection}>...</div>
            </div>
            <div className={styles.messageContentWrapper}>
                {decodeURIComponent(message)}
            </div>
            <div className={styles.messageFooterWrapper}>
                <div className={styles.messageFooterLeftSection}>
                    <div className={styles.iconWrapper}>
                        <img src={Heart} alt="Heart"/>
                    </div>
                    <div className={styles.iconWrapper}>
                        <img src={Comment} alt="Comment"/>
                        <span>
                            {
                                Store.messages.filter(message => message.replyTo === id).length > 0
                                && Store.messages.filter(message => message.replyTo === id).length
                            }
                        </span>
                    </div>
                    <div className={styles.iconWrapper}>
                        <img src={Arrow} alt="Arrow"/>
                    </div>
                </div>
                <div className={styles.messageFooterRightSection}>
                    <div className={styles.iconWrapper_eye}>
                        <img src={Eye} alt="Heart"/>
                    </div>
                </div>
            </div>
            {
                Store.messages.filter(message => message.replyTo === id).map(feedback => {
                    return <div key={feedback.message} className={styles.feedBackWrapper}>
                        <div className={styles.feedBackImage}>
                            <img style={{borderRadius: "50px", width: "50px", height: "50px"}}
                                 className={styles.imageWrapper} src={Person2}/>
                        </div>
                        <div className={styles.feedBackDataWrapper}>
                            <div className={styles.feedBackTitleWrapper}>
                                <div
                                    className={styles.feedBackDataAuthor}>{decodeURIComponent(decoderComments(feedback.author))} </div>
                                <div>{timeConverter(feedback.timestamp)}</div>
                            </div>
                            <div className={styles.feedBackDataContent}>{decodeURIComponent(feedback.message)}</div>
                        </div>
                    </div>
                })
            }

        </div>
    );
};

export default observer(Message);