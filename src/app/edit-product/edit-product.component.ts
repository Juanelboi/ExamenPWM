import {Component, Input} from '@angular/core';
import {Client} from '../models/client';
import {ClientService} from '../services/client-crud/client.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Product} from '../models/product';
import {ProductsService} from '../services/products-crud/products.service';

@Component({
  selector: 'app-edit-product',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  @Input() id?:string;
  product:Product={id:``,name:"",description:""};

  constructor(private productsService: ProductsService,
              public activeModal:NgbActiveModal
  ) {}

  ngOnInit() {
    if (this.id) {
      this.productsService.getProductbyId(this.id).subscribe(res => {
        this.product = res;
      })
    }
  }

  onSubmit(form: NgForm) {
    this.product.name = form.value.name;
    this.product.description = form.value.email;
    this.productsService.updateProduct(this.product).then(() => {
      this.activeModal.close();
      console.log("Data added successfully");
    });
  }
}
