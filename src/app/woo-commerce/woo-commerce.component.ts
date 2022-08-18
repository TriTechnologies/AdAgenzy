import {
  Component,
  OnInit
} from '@angular/core';
import {
  IAttachstore
} from '../Interfaces/attachstore';
import {
  API
} from 'aws-amplify';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';





@Component({
  selector: 'app-woo-commerce',
  templateUrl: './woo-commerce.component.html',
  styleUrls: ['./woo-commerce.component.css']
})
export class WooCommerceComponent implements OnInit {


  Send: any = undefined
  PSend: any = undefined
  attachstores!: IAttachstore;
  form: FormGroup;
  data: any

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      url: [''],
      consumerkey: [''],
      consumersecret: [''],
      
    })
  }

  ngOnInit(): void {}


  create() {
    const UsersData: any[] = []
    UsersData.push(JSON.parse(localStorage.getItem('UserID')!))
    const attachstores = this.form.getRawValue();
    const attachStore = async () => {
      //@ts-ignore
      const data = await API.post('AdAgenzyCRUD', '/items/attachstore', {

        body: {
         
            PK: uuidv4(),
            StoreData: attachstores,
            UsersData: UsersData, 
        },

      }).then(response => {
        console.log(response)
        if (response.message == 'Store Attached') {
          this.Send = response
          API.post('AdAgenzyCRUD', '/items/addproducts', {
            body: {
              UserID: JSON.parse(localStorage.getItem('UserID')!)
            }
          }).then((response) => {
            console.log('products', response)
            if (response.message == 'Products Added') {
              this.PSend = response
              //@ts-ignore
              API.get('AdAgenzyCRUD', '/items/addcompetitors').then((response) => {
                console.log('competitors', response)
              })
            }
          })
        }
      }).catch(error => {
        console.log(error.response)
      });
    };
    attachStore();
  }

}
