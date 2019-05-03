import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService) { 
  }

  ngOnInit() {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });    
  }

  onSubmit(value:any){
    console.log(value);
    this.data.postLogin(value)
    
  }

}
