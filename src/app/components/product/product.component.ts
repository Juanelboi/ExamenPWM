import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {EditClientComponent} from '../edit-client/edit-client.component';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from '../../models/product';
import {ProductsService} from '../../services/products-crud/products.service';
import {EditProductComponent} from '../../edit-product/edit-product.component';


@Component({
  selector: 'app-product',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  products: Product[]=[];
  product?: Product;

  constructor(private productsService: ProductsService,
              private modal: NgbModal) {
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    })
  }

  onSubmit(form: NgForm) {
    this.productsService.addProduct(form.value).then(form.reset)
  }

  editModal(product: Product) {
    const modalRef = this.modal.open(EditProductComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-lg'
    });
    modalRef.componentInstance.id = product.id;
  }

  deleteClient(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProducts(product).then(() => {console.log("deleted!")})
    }
  }

}
