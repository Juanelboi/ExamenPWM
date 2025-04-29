import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Product} from '../../models/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: Firestore) { }

  addProduct(product: Product) {
    const clientRef = collection(this.firestore, 'product');
    return addDoc(clientRef,product);
  }

  getProducts():Observable<Product[]> {
    const clientsRef= collection(this.firestore, 'product');
    return collectionData(clientsRef,{idField:"id"}) as Observable<Product[]>;
  }

  getProductbyId(productID:string) {
    const clientRef= doc(this.firestore, `product/${productID}`);
    return docData(clientRef,{idField:`id`}) as Observable<Product>;
  }

  deleteProducts(product: Product) {
    const productRef= doc(this.firestore, `product/${product.id}`);
    return deleteDoc(productRef);
  }

  updateProduct(product: Product) {
    const productRef= doc(this.firestore, `product/${product.id}`);
    return setDoc(productRef, product);
  }
}
