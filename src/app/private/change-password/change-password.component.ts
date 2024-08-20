import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, } from '@angular/router';
import { httpService } from '../../services/httpServices.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  passwordForm:any;
constructor(private formBuilder:FormBuilder,private httpService:httpService,private toster:ToastrService,private route:Router){}
ngOnInit(){
this.changePassword();
}
changePassword(){
this.passwordForm=this.formBuilder.group({
  curPassword:['',[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/s)]],
  password:['',[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/s)]],
  confirm:['',[Validators.required]]
}, {validator:this.passMatch});
}
passMatch(form:any){
  // console.log("hii")
  const password=form.get('password')?.value;
  const confirm=form.get('confirm')?.value;
  if(password!=confirm){
    form.get('confirm')?.setErrors({misMatch:true});
  }else{
    form.get('confirm')?.setErrors(null)
  }
}
OnChangePassword(){
  if(this.passwordForm.valid){

  
  const data={
    cur_password:this.passwordForm.value.curPassword,
    user_password:this.passwordForm.value.password,
    confirm_password:this.passwordForm.value.confirm
  }
  this.httpService.changePassword(data).subscribe({
    next:(response:any)=>{
      if(response.status==200){
        this.toster.success(response.message)
        this.route.navigateByUrl("/my-profile")
      }else{
        this.toster.error(response.message)
      }
      
      console.log(response)
    },error:(err)=>{
      this.toster.error(err)
      console.log(err)
    }
  })}
}
}