import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  token:string="";
  constructor() {}
  // private isBrowser(): boolean {
  //   return typeof window !== 'undefined';
  // }
  profileToken() {
    if (localStorage) {
    return localStorage.getItem('profileToken') || '';
    }
    return '';
  }

  saveProfileToken(token: string) {
    // if (this.isBrowser()) {
      localStorage?.setItem('profileToken', token);
      return this.profileToken();
    // }
    // return '';
  }
  logout(){
    return localStorage?.removeItem("profileToken");
  }
}

