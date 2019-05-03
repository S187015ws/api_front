import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  RegisterForm: FormGroup;
  constructor(private fb: FormBuilder,private data: DataService) {     
  }


  ngOnInit() {
    this.RegisterForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      repassword: ['', Validators.required ]
    });    
  }
  onSubmit(value:any){
    if(value.password == value.repassword){
      delete value.repassword;
      console.log(value);
      console.log(JSON.stringify(value))
      this.data.postRegister(value);
    }else{
      return;
    }

  }
}
