import {action, makeObservable, observable} from 'mobx';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class AppsMobx {
  listFM = [];
  listRN = [];
  listCR = [];
  listASO = [];

  constructor() {
    makeObservable(this, {
        listFM: observable,
        listRN: observable,
        listCR: observable,
        listASO: observable,
        updateFM: action,
        updateRN: action,
        updateCR: action,
        updateASO: action,
        changeFM: action,
        changeRN: action,
        changeCR: action,
        changeASO: action
    });
  }

  async updateFM(){
    await getDocs(collection(db, "taskfirsmoderation"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                this.listFM = newData
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

  async updateCR(){
    await getDocs(collection(db, "taskcreo"))
    .then((querySnapshot)=>{               
        const newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
            this.listCR = newData
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

  async changeCR(id){
    const app = doc(db,'taskcreo', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.updateCR())
      .catch(error => console.log(error.message))
  }

  async changeASO(id){
    const app = doc(db,'taskasomobile', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.updateASO())
      .catch(error => console.log(error.message))
  }
}

const appsMobx = new AppsMobx();

export default appsMobx;