import { Component, ElementRef, ViewChild, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userData:any={'email':"ayushi@gmail.com"};
  @ViewChild("modal") modal!:ElementRef;

  constructor(private _service:ApplicationService,private router:Router,private alert:AlertService){}

  login(){
    let params:any = {
      email:this.userData.email,
      password:this.userData.password
    };

    this._service.login(params,(res:any)=>{
      if(res.status == 200){
        this.closeModal();
        this.setDataIntoLocal();
        this.router.navigate(['home']);
        this.alert.alert("success", "Login Successfully", "success", { displayDuration: 2000, pos: 'top' });
      }else {
        this.alert.alert("error", "Incorrect Password", "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }


  setDataIntoLocal(){
    sessionStorage.setItem("isLoggedIn",JSON.stringify(true));
  }

  closeModal(){
    let el :any= document.querySelector(".modal-backdrop");
    el?.classList.remove("show");
    el.hidden=true;
  }

}
