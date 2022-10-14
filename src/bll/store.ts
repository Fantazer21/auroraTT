import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

type UserType = {
    id: string
    name: string
    surname: string
}

type MessageType = {
    author: string
    id: number
    message: string
    replyTo: number
    timestamp: number
}

class Store {

    loaderStatus = false

    users: UserType[] | [] = []

    messages: MessageType[] | [] = []

    constructor() {
        makeAutoObservable(this)
    }

    getUsers() {

        let urls = [
            '/api/json/users',
            '/api/json/messages',
            '/api/json/me'
        ];

        let requests = urls.map(url => axios.get(url));

        this.setLoaderStatus(true)

        Promise.all(requests)
            .then(responses => {
                    runInAction(() => {
                        this.messages = responses.map(el => el.data.answer).find(el => el.messages).messages
                        this.users = responses.map(el => el.data.answer).find(el => el.users).users
                    })
                }
            )
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    this.setLoaderStatus(false)
                }, 2000)
            })
    }

    //TODO: Not working 401 error
    addMessage() {
        axios.post('/api/json/message',
            {
                id: 42332,
                message: "Test message",
            })
    }

    setLoaderStatus(status: boolean) {
        this.loaderStatus = status
    }
}

export default new Store()