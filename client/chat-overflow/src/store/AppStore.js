import { observable, reaction, action } from 'mobx'

class AppStore {
    constructor() {
        this.loading = false;
        this.uid = ''
    }
    @observable loading
    @observable uid

    @action setLoading = (bool) => {
        this.loading = bool
    }
    @action setUid = (id) => {
        this.uid = id
    }
}

export default new AppStore()