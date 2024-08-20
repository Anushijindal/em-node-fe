import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { httpService } from '../../services/httpServices.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  httpClient = inject(HttpClient);
  data: Array<any> = [];
  signupForm: any;
  constructor(
    public formBuilder: FormBuilder,
    private httpService: httpService,
    private toastr:ToastrService,
    private router:Router
  ) {}
  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.pattern(
            /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
          ),
          Validators.required,
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
      check: [false],
      // num:['',[Validators.min(10),Validators.max(10),Validators.required]],
      // address:['',[Validators.required]],
      // country:['',[Validators.required]],
      // city:['',[Validators.required]],
      // state:['',[Validators.required]],
      // gender:['',[Validators.required]]
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const data = {
        firstname: this.signupForm.value.firstname,
        lastname: this.signupForm.value.lastname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
      this.httpService.signupPost(data).subscribe({
        next: (response: any) => {
          console.log(response);
          this.toastr.success("Signed up successfully")
          this.router.navigateByUrl("/login")
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message)
        },
      });
      // this.httpClient
      //   .post(
      //     'http://localhost/employees_management/api/v1/auth/signup/',
      //     this.signupForm.value
      //   )
      //   .subscribe({
      //     next: (data: any) => {
      //       console.log(data);
      //     },error:(err) =>{
      //         console.log(err)
      //     },
      //   });
    }
  }
}
