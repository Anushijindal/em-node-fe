import { Component, OnInit } from '@angular/core';
import { httpService } from '../../services/httpServices.service';
// import { SidebarComponent } from "../../sidebar/sidebar.component";
import { Router, RouterLink } from '@angular/router';
import { PrivateComponent } from '../private.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { StorageService } from '../../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonComponent } from '../../common/components/ui/ui-elements/button/button.component';
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [SidebarComponent, PrivateComponent, RouterLink, ButtonComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent implements OnInit {
  // jwt=localStorage.getItem('jwt');
  userName: string = '';
  email: string = '';
  gender: string = '';
  country: string = '';
  city: string = '';
  state: string = '';
  phone: string = '';
  address: string = '';
  image: string = '';
  role: string = '';
  constructor(
    private httpService: httpService,
    private router: Router,
    private storage: StorageService,
    private toster: ToastrService
  ) {
    this.router.navigate(['/my-profile']);
  }
  ngOnInit() {
    // this.router.navigate(['/my-profile']);
    this.getUser();
  }
  getUser() {
    this.httpService.myProfile().subscribe({
      next: (response: any) => {
        if (response.status != 200) {
          this.toster.error(response.message);
          this.storage.logout();
        } else {
          console.log(response.data);
          this.userName =
            response.data.userFirstName + ' ' + response.data.userLastName;
          this.email = response.data.userEmail;
          this.phone = response.data.userPhone ? response.data.userPhone : 'NA';
          this.gender = response.data.userGender
            ? response.data.userGender
            : 'NA';
          this.role = response.data.userRoleName;
          this.address = response.data.userAddress
            ? response.data.userAddress
            : 'NA';
          this.country = response.data.userCountry
            ? response.data.userCountry
            : 'NA';
          this.state = response.data.userState ? response.data.userState : 'NA';
          this.city = response.data.userCity ? response.data.userCity : 'NA';
          this.image = response.data.userImage;
        }
      },
      error: (err) => {
        console.log(err);
        // if (err.statusText == 'Session Expired') {
        //   this.storage.logout();
        // }
        // this.storage.logout();
      },
    });
  }
  updateProfile() {
    this.router.navigateByUrl('/updateProfile');
  }
}
