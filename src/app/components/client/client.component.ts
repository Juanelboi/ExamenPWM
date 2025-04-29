import {Component, OnInit} from '@angular/core';
import {FormGroup, FormsModule, NgForm} from '@angular/forms';
import {Client} from '../../models/client';
import {NgFor, NgIf} from '@angular/common';
import {ClientService} from '../../services/client-crud/client.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditClientComponent} from '../edit-client/edit-client.component';
import { BrowserModule } from '@angular/platform-browser'


@Component({
  selector: 'app-product',
  imports: [
    FormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clients: Client[]=[];
  client?: Client;

  constructor(private clientService: ClientService,
              private modal: NgbModal) {
  }

  ngOnInit() {
      this.clientService.getClients().subscribe((res: Client[]) => {
        this.clients = res;
      })
  }

  onSubmit(form: NgForm) {
    this.clientService.addClient(form.value).then(form.reset)
  }

  editModal(client: Client) {
    const modalRef = this.modal.open(EditClientComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-lg'
    });
    modalRef.componentInstance.id = client.id;
  }

  deleteClient(client: Client) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.clientService.deleteClient(client).then(() => {console.log("deleted!")})
    }
  }
}
