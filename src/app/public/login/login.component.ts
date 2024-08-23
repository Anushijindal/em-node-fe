import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { httpService } from '../../services/httpServices.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../services/storage.service';
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input-box/em-input-box.component';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { EmDisabledButtonComponent } from '../../common/components/ui/form-elements/em-disabled-button/em-disabled-button.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    EmInputComponent,
    EmButtonComponent,
    EmDisabledButtonComponent,
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private httpService: httpService,
    private toastr: ToastrService,
    private router: Router,
    private storage: StorageService
  ) {
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
  ngOnInit() {}
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      const data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.httpService.loginPost(data).subscribe({
        next: (response: any) => {
          if (response.status == 401) {
            console.log(response.message);
            this.toastr.error(response.message);
            return;
          }
          console.log(response);
          this.storage.saveProfileToken(response.jwt);
          this.toastr.success(response.message);
          this.router.navigateByUrl('my-profile');
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        },
      });
    }
  }
}
