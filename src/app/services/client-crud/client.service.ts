import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Client} from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: Firestore) { }

  addClient(client: Client) {
  const clientRef = collection(this.firestore, 'client');
  return addDoc(clientRef,client);
  }

  getClients():Observable<Client[]> {
    const clientsRef= collection(this.firestore, 'client');
    return collectionData(clientsRef,{idField:"id"}) as Observable<Client[]>;
  }

  getClientbyId(clientID:string) {
    const clientRef= doc(this.firestore, `client/${clientID}`);
    return docData(clientRef,{idField:`id`}) as Observable<Client>;
  }

  deleteClient(client: Client) {
    const clientRef= doc(this.firestore, `client/${client.id}`);
    return deleteDoc(clientRef);
  }

  updateClient(client: Client) {
    const clientRef= doc(this.firestore, `client/${client.id}`);
    return setDoc(clientRef, client);
  }

}
