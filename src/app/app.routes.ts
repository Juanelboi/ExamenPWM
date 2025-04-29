import { Routes } from '@angular/router';
import {ClientComponent} from './components/client/client.component';
import {OrderComponent} from './components/order/order.component';
import {ProductComponent} from './components/product/product.component';

export const routes: Routes = [
  {path :"", component : ClientComponent},
  {path :"order", component : OrderComponent},
  {path :"product", component : ProductComponent},
];
