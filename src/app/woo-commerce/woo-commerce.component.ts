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
    const attachstores = this.form.getRawValue();
    const attachStore = async () => {
      //@ts-ignore
      const data = await API.post('AdAgenzyCRUD', '/items/attachstore', {

        body: {
         
            ...this.form.getRawValue(),
            PK: uuidv4(),
            StoreData: attachstores,
          
          IS_TOUCHED: 'False'
        },

      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error.response)
      });
    };
    attachStore();
  }

}
