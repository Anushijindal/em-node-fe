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
        if (response.statusCode != 200) {
          this.toster.error(response.message);
          this.storage.logout();
        } else {
          console.log(response.data);
          this.userName =
            response.data.firstname + ' ' + response.data.lastname;
          this.email = response.data.email;
          this.phone = response.data.phone ? response.data.phone : 'NA';
          this.gender = response.data.gender
            ? response.data.gender
            : 'NA';
          this.role = response.data.role;
          this.address = response.data.address
            ? response.data.address
            : 'NA';
          this.country = response.data.country
            ? response.data.country
            : 'NA';
          this.state = response.data.state ? response.data.state : 'NA';
          this.city = response.data.city ? response.data.city : 'NA';
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
