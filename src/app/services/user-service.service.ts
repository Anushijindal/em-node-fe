import { Injectable } from '@angular/core';
import { httpService } from './httpServices.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  user = new BehaviorSubject<any>({});
  loggedUser = this.user.asObservable();
  constructor(private httpService: httpService) {
  }
  userData() {
    this.httpService.myProfile().subscribe({
      next: (response: any) => {
        this.user.next(response?.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
