import {action, makeObservable, observable} from 'mobx';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class AppsMobx {
  selfList = [];
  appList = [];
  listFM = [];
  listRN = [];
  listTO = [];
  listASO = [];
  listTR = [];

  constructor() {
    makeObservable(this, {
        selfList: observable,
        appList: observable,
        listFM: observable,
        listRN: observable,
        listTO: observable,
        listASO: observable,
        listTR: observable,
        updateAppList: action,
        updateFM: action,
        updateRN: action,
        updateTO: action,
        updateASO: action,
        updateTR: action,
        changeFM: action,
        changeRN: action,
        changeTO: action,
        changeASO: action,
        changeTR: action
    });
  }

  async updateSelfList(){
    await getDocs(collection(db, "self"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.selfList = newData
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
}

const appsMobx = new AppsMobx();

export default appsMobx;