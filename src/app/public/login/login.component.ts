import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { httpService } from '../../services/httpServices.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [
    // {
    //   provide:ToastrService,useClass:ToastrService
    // },
    // {
    //   provide:ToastNoAnimation,useClass:ToastNoAnimation
    // }
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // httpClient = inject(HttpClient);
  // public data: Array<any> = [];
  loginForm: any;

  // isFormVisible:boolean=true;
  // items:string[]=["item1","item2","item3","item4"];
  // role:number=10;
  constructor(
    public formBuilder: FormBuilder,
    private httpService: httpService,
    private toastr: ToastrService,
    private router:Router,
    private storage:StorageService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/s
          ),
          Validators.required,
        ],
      ],
      check: [''],
    });
  }
  onSubmit() {
    if(this.loginForm.valid){

      console.log('Form submitted:', this.loginForm.value);
      const data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.httpService.loginPost(data).subscribe({
        next: (response: any) => {
          // console.log(response);
          if (response.status == 401) {
            console.log(response.message);
            this.toastr.error(response.message);
            return;
          }
          console.log(response);
          this.storage.saveProfileToken(response.jwt);
          // localStorage.setItem('profileToken', response.jwt);
          this.toastr.success('Logged in successfully');
          this.router.navigateByUrl("my-profile")
          // this.data = data;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message)
        },
      });
    }
  }
}
