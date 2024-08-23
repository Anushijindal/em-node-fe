import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { httpService } from '../../services/httpServices.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { EmDisabledButtonComponent } from '../../common/components/ui/form-elements/em-disabled-button/em-disabled-button.component';
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input-box/em-input-box.component';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    EmButtonComponent,
    EmDisabledButtonComponent,
    EmInputComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  httpClient = inject(HttpClient);
  // data: Array<any> = [];
  signupForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private httpService: httpService,
    private toastr: ToastrService,
    private router: Router
  ) {
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
    });
  }
  ngOnInit() {}
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
          this.toastr.success(response.message);
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        },
      });
    }
  }
}
