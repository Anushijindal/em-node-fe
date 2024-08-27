import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class httpService {

  constructor(private httpClient:HttpClient,private httpParams:HttpParams) { }
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
  deleteProject(id:any){
    return this.httpClient.delete(`http://localhost/employees_management/api/v1/deleteProject/?id=${id}`)
  }
  updateProject(id:any,body:any){
    return this.httpClient.put(`http://localhost/employees_management/api/v1/updateProject/index.php?id=${id}`,body)
  }
  getProject(id:any){
    return this.httpClient.get(`http://localhost/employees_management/api/v1/getProject/index.php?id=${id}`)
  }
}
