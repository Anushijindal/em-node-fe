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
import { EmInputComponent } from '../../common/components/ui/form-elements/em-input/em-input.component';
import { MatInputModule } from '@angular/material/input';
import { EmSelectComponent } from '../../common/components/ui/form-elements/em-select/em-select.component';
import { EmButtonComponent } from '../../common/components/ui/form-elements/em-button/em-button.component';
import { MatSelectChange } from '@angular/material/select';
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
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent {
  firstname: string = '';
  lastname: string = '';
  phone: string = '';
  gender: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  address: string = '';
  updateForm: any;
  selectedGender: string = '';
  selectedCountry: string = '';
  countryData: any = '';
  stateData: any;
  cityData: any;
  constructor(
    private httpService: httpService,
    private formBuilder: FormBuilder,
    private toster: ToastrService,
    private route: Router
  ) {}
  async ngOnInit() {
    this.updateForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userCountry: ['', Validators.required],
      userState: ['', Validators.required],
      userCity: ['', Validators.required],
      userPhone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userGender: [''],
      userAddress: ['', Validators.required],
    });
    await this.getUserData();
  }
  // selectGender(formGroup: FormGroup) {
  //   const gender = formGroup.get('userGender')?.value;
  //   if (gender == 'select') {
  //     return { invalidChoice: true };
  //   } else {
  //     return null;
  //   }
  // }
  getUserData() {
    this.httpService.myProfile().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.country = response.data.userCountry;
        console.log(this.country);

        this.updateForm.patchValue({
          userFirstName: response?.data?.userFirstName,
          userGender: response.data.userGender,
          userCountry: response.data.userCountry,
          userLastName: response.data.userLastName,
          userPhone: response.data.userPhone,
          userAddress: response.data.userAddress,
          userState: response.data.userState,
          userCity: response.data.userCity,
        });

        this.fetchCountryData();
        const stateData = {
          user_country: response.data.userCountry,
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
          user_state: response.data.userState,
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
        this.countryData = response.data;

        console.log(this.countryData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ChangeCountryData(event: MatSelectChange) {
    const selectElement = event ;
    console.log(selectElement)
    const country = selectElement ;
    console.log(country, 'asmndjhasdmjhasd&&');
    const stateData = {
      user_country: country,
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
      user_state: state,
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

  Data(event: HTMLSelectElement) {
    const selectedCountry = event.value;
    console.log('Selected country:', selectedCountry);
    // Add your logic here based on the selected country
  }
  onUpdate() {
    if (this.updateForm.valid) {
      const data = {
        user_first_name: this.updateForm.value.userFirstName,
        user_last_name: this.updateForm.value.userLastName,
        user_gender: this.updateForm.value.userGender,
        user_country: this.updateForm.value.userCountry,
        user_state: this.updateForm.value.userState,
        user_city: this.updateForm.value.userCity,
        user_street_address: this.updateForm.value.userAddress,
        user_phone: this.updateForm.value.userPhone,
      };
      this.httpService.updateProfile(data).subscribe({
        next: (response: any) => {
          console.log(response);
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
