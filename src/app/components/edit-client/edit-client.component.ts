import {Component, Input} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Client} from '../../models/client';
import {ClientService} from '../../services/client-crud/client.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-product',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {

  @Input() id?:string;
  client:Client={id:``,name:"",email:""};

  constructor(private clientService: ClientService,
              public activeModal:NgbActiveModal
  ) {}

  ngOnInit() {
    if (this.id) {
      this.clientService.getClientbyId(this.id).subscribe(res => {
        this.client = res;
      })
    }
  }

  onSubmit(form: NgForm) {
    this.client.name = form.value.name;
    this.client.email = form.value.email;
    this.clientService.updateClient(this.client).then(() => {
      this.activeModal.close();
      console.log("Data added successfully");
    });
  }
}
