import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  constructor(private httpClient:HttpClient) { }
  loginPost(body:any){
    return this.httpClient.post('http://localhost/employees_management/api/v1/auth/login/',body);
  };
  signupPost(body:any){
    return this.httpClient.post('http://localhost/employees_management/api/v1/auth/signup/',body)
  }
  myProfile(){
    return this.httpClient.get("http://localhost/employees_management/api/v1/me/")
  }
  updateProfile(body:any){
    return this.httpClient.put("http://localhost/employees_management/api/v1/updateProfile/",body)
  }
  changePassword(body:any){
    return this.httpClient.put("http://localhost/employees_management/api/v1/changePassword/",body)
  }
  fetchCountry(){
    return this.httpClient.get("http://localhost/employees_management/api/v1/fetchCountry/")
  }
  fetchState(body:any){
    return this.httpClient.post("http://localhost/employees_management/api/v1/fetchState/",body)
  }
  fetchCity(body:any){
    return this.httpClient.post("http://localhost/employees_management/api/v1/fetchCity/",body)
  }
  fetchProjects(){
    return this.httpClient.get("http://localhost/employees_management/api/v1/projects/");
  }
  addProject(body:any){
    return this.httpClient.post("http://localhost/employees_management/api/v1/addProject/",body)
  }
}
