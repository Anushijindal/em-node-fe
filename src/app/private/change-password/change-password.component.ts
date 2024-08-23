import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { httpService } from '../../services/httpServices.service';
import { ToastrService } from 'ngx-toastr';
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input-box/em-input-box.component';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { EmDisabledButtonComponent } from '../../common/components/ui/form-elements/em-disabled-button/em-disabled-button.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    EmInputComponent,
    EmButtonComponent,
    EmDisabledButtonComponent,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: httpService,
    private toster: ToastrService,
    private route: Router
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        curPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/s
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/s
            ),
          ],
        ],
        confirm: ['', [Validators.required]],
      },
      { validator: this.passMatch }
    );
  }
  ngOnInit() {}
  changePassword() {}
  passMatch(form: FormGroup) {
    // console.log("hii")
    const password = form.get('password')?.value;
    const confirm = form.get('confirm')?.value;
    if (password != confirm) {
      form.get('confirm')?.setErrors({ misMatch: true });
    } else {
      form.get('confirm')?.setErrors(null);
    }
  }
  OnChangePassword() {
    if (this.passwordForm.valid) {
      const data = {
        cur_password: this.passwordForm.value.curPassword,
        user_password: this.passwordForm.value.password,
        confirm_password: this.passwordForm.value.confirm,
      };
      this.httpService.changePassword(data).subscribe({
        next: (response: any) => {
          if (response.status == 200) {
            this.toster.success(response.message);
            this.route.navigateByUrl('/my-profile');
          } else {
            this.toster.error(response.message);
          }

          console.log(response);
        },
        error: (err) => {
          this.toster.error(err);
          console.log(err);
        },
      });
    }
  }
}
