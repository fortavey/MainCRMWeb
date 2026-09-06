import {action, makeObservable, observable} from 'mobx';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class AppsMobx {
  snackBar = {
    text: "Рыба текст",
    status: "success",
    open: false
  }
  currentUser = "";
  appCounterList = [];
  selfList = [];
  appList = [];
  brendsList = [];
  listFM = [];
  listRN = [];
  listTO = [];
  listASO = [];
  listTR = [];
  usersList = [];

  constructor() {
    makeObservable(this, {
        appCounterList: observable,
        snackBar: observable,
        currentUser: observable,
        selfList: observable,
        appList: observable,
        brendsList: observable,
        listFM: observable,
        listRN: observable,
        listTO: observable,
        listASO: observable,
        listTR: observable,
        usersList: observable,
        changeCounter: action,
        updateCurrentUser: action,
        updateAppList: action,
        updateBrendsList: action,
        updateFM: action,
        changeFMWork:action,
        updateRN: action,
        updateTO: action,
        updateASO: action,
        updateTR: action,
        changeFM: action,
        changeRN: action,
        changeTO: action,
        changeASO: action,
        changeTR: action,
        changeBrend: action,
        updateUsersList: action,
        updateAppCounterList: action
    });
  }

  updateCurrentUser(user){
    this.currentUser = user
  }

  async updateAppCounterList(){
    await getDocs(collection(db, "counterfirsmoderation"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.appCounterList = newData
        })
  }

  async updateUsersList(){
    await getDocs(collection(db, "users"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.usersList = newData
        })
  }

  async updateSelfList(){
    await getDocs(collection(db, "self"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.selfList = newData
        })
  }

  async updateBrendsList(){
    await getDocs(collection(db, "brends"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.brendsList = newData
        })
  }

  async updateAppList(){
    await getDocs(collection(db, "apps"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.appList = newData
                // .filter(el => !el.isBan)
                .filter(el => el.newAppName)
                .sort(( a, b ) => {
                  if ( a.newAppName < b.newAppName ){
                    return -1;
                  }
                  if ( a.newAppName > b.newAppName ){
                    return 1;
                  }
                  return 0;
                })
        })
  }

  async updateFM(){
    await getDocs(collection(db, "taskfirsmoderation"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.listFM = newData.sort(( a, b ) => {
                  if ( a.timestamp < b.timestamp ){
                    return -1;
                  }
                  if ( a.timestamp > b.timestamp ){
                    return 1;
                  }
                  return 0;
                })
        })
  }

  async updateRN(){
    await getDocs(collection(db, "taskrename"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            this.listRN = newData
    })
  }

  async updateTO(){
    await getDocs(collection(db, "taskturnon"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            this.listTO = newData
    })
  }

  async updateASO(){
    await getDocs(collection(db, "taskasomobile"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            this.listASO = newData
    })
  }

  async updateTR(){
    await getDocs(collection(db, "tasktransfer"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            this.listTR = newData
            console.log(this.listTR)
    })
  }

  async changeFM(id){
    const app = doc(db,'taskfirsmoderation', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.updateFM())
      .catch(error => console.log(error.message))
  }

  async changeFMWork(id, bool = false){
    const app = doc(db,'taskfirsmoderation', id)
    const user = bool ? "" : this.currentUser.id
    updateDoc(app, { user: user })
      .then(response =>  this.updateFM())
      .catch(error => console.log(error.message))
  }

  async changeCounter(id){
    const counterRef = collection(db, 'counterfirsmoderation');
    const newCounterRef = doc(counterRef);
    await setDoc(newCounterRef, {
      user: this.currentUser.name,
      time: Date.now(),
      appId: id
    });

  }

  async changeFMFail(id){
    const app = doc(db,'taskfirsmoderation', id)
    updateDoc(app, { isDone: true, isFull: true })
      .then(response =>  this.updateFM())
      .catch(error => console.log(error.message))
  }

  async changeRN(id){
    const app = doc(db,'taskrename', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.updateRN())
      .catch(error => console.log(error.message))
  }

  async changeTO(id){
    const app = doc(db,'taskturnon', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.updateTO())
      .catch(error => console.log(error.message))
  }

  async changeASO(id){
    const app = doc(db,'taskasomobile', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.updateASO())
      .catch(error => console.log(error.message))
  }

  async changeTR(id){
    const app = doc(db,'tasktransfer', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.updateTR())
      .catch(error => console.log(error.message))
  }

  async changeIsUac(id){
    const app = doc(db,'apps', id)
    updateDoc(app, { isUAC: true })
      .then(response =>  this.updateAppList())
      .catch(error => console.log(error.message))
  }

  async changeBrend(id, cluster, isPaused){
    const brend = doc(db,'brends', id)
    updateDoc(brend, { limitCounter: cluster,  isPaused: isPaused})
      .then(response =>  this.updateBrendsList())
      .catch(error => console.log(error.message))
  }

  async addBrend(name, cluster){
    const brendsRef = collection(db, 'brends');
    const newBrendRef = doc(brendsRef);
    await setDoc(newBrendRef, {
      name: name,
      limitCounter: cluster,
      isFavorite: true
    });
  }
}

const appsMobx = new AppsMobx();

export default appsMobx;