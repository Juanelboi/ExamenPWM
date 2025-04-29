import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client-crud/client.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductsService} from '../../services/products-crud/products.service';
import {OrdersService} from '../../services/orders-crud/orders.service';
import {Product} from '../../models/product';
import {Order} from '../../models/order';
import {EditOrderComponent} from '../edit-order/edit-order.component';

@Component({
  selector: 'app-order',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  order?:Order;
  orders:Order[]=[];
  clients:Client[]=[];
  products:Product[]=[];

  ngOnInit() {
    this.clientService.getClients().subscribe((res: Client[]) => {
      this.clients = res;
    })
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    })
    this.OrderService.getOrders().subscribe((res: Order[]) => {
      this.orders = res;
    })

  }

  constructor(private clientService: ClientService,
              private productService: ProductsService,
              private OrderService: OrdersService,
              private modal: NgbModal) {
  }




  onSubmit(form: NgForm) {
    this.OrderService.addOrder(form.value).then(form.reset);
  }

  editModal(order:Order) {
    const modalRef = this.modal.open(EditOrderComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-lg'
    });
    modalRef.componentInstance.id = order.id;
  }

  deleteOrder(order: Order) {

  }
}
