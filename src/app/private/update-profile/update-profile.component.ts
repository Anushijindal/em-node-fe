import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { httpService } from '../../services/httpServices.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input-box/em-input-box.component';
import { MatInputModule } from '@angular/material/input';
import { EmSelectComponent } from '../../common/components/ui/form-elements/em-select-box/em-select-box.component';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { MatSelectChange } from '@angular/material/select';
import { UserService } from '../../services/user-service.service';
import { EmDisabledButtonComponent } from '../../common/components/ui/form-elements/em-disabled-button/em-disabled-button.component';
@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    EmInputComponent,
    MatInputModule,
    EmSelectComponent,
    EmButtonComponent,
    EmDisabledButtonComponent,
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent {
  updateForm: FormGroup;
  countryData: [] = [];
  stateData: [] = [];
  cityData: [] = [];
  userRole: string = '';
  constructor(
    private httpService: httpService,
    private formBuilder: FormBuilder,
    private toster: ToastrService,
    private route: Router,
    private userService: UserService
  ) {
    this.updateForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userCountry: ['', Validators.required],
      userState: ['', Validators.required],
      userCity: ['', Validators.required],
      userPhone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      userGender: [''],
      userAddress: ['', Validators.required],
    });
  }
  async ngOnInit() {
    await this.getUserData();
  }
  getUserData() {
    this.httpService.myProfile().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.userRole = response.data.role;
        this.updateForm.patchValue({
          userFirstName: response?.data?.firstname,
          userGender: response.data.gender,
          userCountry: response.data.country,
          userLastName: response.data.lastname,
          userPhone: response.data.phone,
          userAddress: response.data.address,
          userState: response.data.state,
          userCity: response.data.city,
        });

        this.fetchCountryData();
        const stateData = {
          countryName: response.data.country,
        };
        this.httpService.fetchState(stateData)?.subscribe({
          next: (response: any) => {
            console.log(response);
            this.stateData = response.data;
          },
          error: (err) => {
            console.log(err);
          },
        });

        const cityData = {
          stateName: response.data.state,
        };

        this.httpService.fetchCity(cityData)?.subscribe({
          next: (response: any) => {
            console.log(response);
            this.cityData = response.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  public genderOptions: string[] = ['Female', 'Male'];

  fetchCountryData() {
    this.httpService.fetchCountry().subscribe({
      next: (response: any) => {
        console.log(response);
        console.log(response);

        this.countryData = response.data;

        console.log(this.countryData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ChangeCountryData(event: MatSelectChange) {
    const selectElement = event;
    console.log(selectElement);
    const country = selectElement;
    console.log(country, 'asmndjhasdmjhasd&&');
    const stateData = {
      countryName: country,
    };

    this.httpService.fetchState(stateData)?.subscribe({
      next: (response: any) => {
        console.log(response);
        this.stateData = response.data;
        this.cityData = [];
        this.updateForm.patchValue({
          userState: '',
          userCity: '',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ChangeStateData(event: MatSelectChange) {
    const selectElement = event;
    const state = selectElement;
    console.log(state, 'asmndjhasdmjhasd&&');

    const cityData = {
      stateName: state,
    };

    this.httpService.fetchCity(cityData)?.subscribe({
      next: (response: any) => {
        console.log(response);
        this.cityData = response.data;
        this.updateForm.patchValue({
          userCity: '',
        });
        // this.updateForm.patchValue()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onUpdate() {
    if (this.updateForm.valid) {
      const data = {
        firstname: this.updateForm.value.userFirstName,
        lastname: this.updateForm.value.userLastName,
        gender: this.updateForm.value.userGender,
        country: this.updateForm.value.userCountry,
        state: this.updateForm.value.userState,
        city: this.updateForm.value.userCity,
        address: this.updateForm.value.userAddress,
        phone: this.updateForm.value.userPhone,
      };
      // this.userService.user.
      this.httpService.updateProfile(data).subscribe({
        next: (response: any) => {
          console.log(response);
          this.userService.setProfile({
            firstName: this.updateForm.value.userFirstName || '',
            lastName: this.updateForm.value.userLastName || '',
            userRole: this.userRole || '',
          });
          this.toster.success(response.message);
          this.route.navigateByUrl('/my-profile');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
