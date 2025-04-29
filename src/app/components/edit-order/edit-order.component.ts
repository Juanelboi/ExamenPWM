import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client-crud/client.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Order} from '../../models/order';
import {OrdersService} from '../../services/orders-crud/orders.service';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from '../../models/product';
import {ProductsService} from '../../services/products-crud/products.service';

@Component({
  selector: 'app-edit-order',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent implements OnInit {

  @Input() id?:string;
  order:Order={id:``,clientId:"",ProductId:"",quantity:0};
  clients:Client[]=[];
  products:Product[]=[];


  ngOnInit() {
    this.clientService.getClients().subscribe((res: Client[]) => {
      this.clients = res;
    })
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    })
    if (this.id) {
      this.OrderService.getOrderbyId(this.id).subscribe(res => {
        this.order = res;
      })
    }
  }

  constructor(private clientService: ClientService,
              private productService: ProductsService,
              private OrderService: OrdersService,
              public activeModal:NgbActiveModal) {
  }


  onSubmit(form: NgForm) {
    this.order.clientId = form.value.clientId;
    this.order.ProductId = form.value.ProductId;
    this.order.quantity = form.value.quantity;
    this.OrderService.updateOrder(this.order).then(() => {
      this.activeModal.close();
      console.log("Data added successfully");
    });
  }
}
