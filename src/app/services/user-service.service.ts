import { Injectable } from '@angular/core';
import { httpService } from './httpServices.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  loggedUser:any;
  constructor(private httpService:httpService) { 
   }
   userData(){
    this.httpService.myProfile().subscribe({
      next:(response:any)=>{
        this.loggedUser=response.data
        console.log(response)
        return response;
      },error:(err)=>{
        console.log(err)
      }
    })
    // return "empty";
   }
}
