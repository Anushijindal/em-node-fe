import { Injectable } from '@angular/core';
import { httpService } from './httpServices.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  user = new BehaviorSubject<any>({});
  loggedUser = this.user.asObservable();
  profile:any;
  constructor(private httpService: httpService) {
    console.log(this.user, 'ti34g', this.loggedUser);
  }
  userData() {
    this.httpService.myProfile().subscribe({
      next: (response: any) => {
        console.log(response.data,"iw4gth");
        this.user.next(response?.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
