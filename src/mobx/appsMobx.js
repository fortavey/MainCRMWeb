import {action, makeObservable, observable} from 'mobx';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class AppsMobx {
  list = [];

  constructor() {
    makeObservable(this, {
        list: observable,
        update: action,
        change: action
    });
  }

  async update(){
    await getDocs(collection(db, "taskfirsmoderation"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    this.list = newData
            })
  }

  async change(id){
    const app = doc(db,'taskfirsmoderation', id)
    updateDoc(app, { isDone: true })
      .then(response =>  this.update())
      .catch(error => console.log(error.message))
  }
}

const appsMobx = new AppsMobx();

export default appsMobx;