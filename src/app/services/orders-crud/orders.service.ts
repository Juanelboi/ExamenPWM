import { Injectable } from '@angular/core';
import {Order} from '../../models/product';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: Firestore) { }

  addOrder(order: Order) {
    const clientRef = collection(this.firestore, 'order');
    return addDoc(clientRef,order);
  }

  getOrders():Observable<Order[]> {
    const clientsRef= collection(this.firestore, 'order');
    return collectionData(clientsRef,{idField:"id"}) as Observable<Order[]>;
  }

  getOrderbyId(productID:string) {
    const clientRef= doc(this.firestore, `order/${productID}`);
    return docData(clientRef,{idField:`id`}) as Observable<Order>;
  }

  deleteOrder(order: Order) {
    const orderRef= doc(this.firestore, `order/${order.id}`);
    return deleteDoc(orderRef);
  }

  updateOrder(product: Order) {
    const productRef= doc(this.firestore, `order/${product.id}`);
    return setDoc(productRef, product);
  }
}
