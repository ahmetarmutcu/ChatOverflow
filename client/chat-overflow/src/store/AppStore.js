import { observable, reaction, action } from 'mobx'
import socketIO from 'socket.io-client';
import Axios from 'axios';


class AppStore {
    constructor() {
        this.loading = false;
        this.uid = ''
        this.io = socketIO.connect('https://chatsauuu.herokuapp.com', {
            timeout: 10000,
        });
        this.questions=[]
        this.keys=[]
        this.setQuestion()
    }
    @observable loading
    @observable uid
    @observable io
    @observable questions
    @observable keys

    @action setLoading = (bool) => {
        this.loading = bool
    }
    @action setUid = (id) => {
        this.uid = id
    }
    @action setQuestion = () => {
        Axios.get('https://chatsauuu.herokuapp.com/question/questions').then(async (response) => {
            //console.log(response.data)
            if (response.data.status == 200) {
                //console.log(response.data.data[0])
                //console.log(typeof JSON.parse(response.data.data))
                this.questions = response.data.data
                this.keys = (Object.keys(response.data.data))
                //await this.setState({
                //  keys: Object.keys(response.data.data),
                //  questions: response.data.data,
                //})
            }
        })

            .catch((err) => {
                console.log('Erreur : ' + err)
            })
    }
}

export default new AppStore()