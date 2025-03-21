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

  constructor() {
    makeObservable(this, {
        listFM: observable,
        listRN: observable,
        listCR: observable,
        updateFM: action,
        updateRN: action,
        updateCR: action,
        changeFM: action,
        changeRN: action
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
}

const appsMobx = new AppsMobx();

export default appsMobx;