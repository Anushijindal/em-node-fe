import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { catchError } from "rxjs";

export const httpRequest:HttpInterceptorFn=(req,next)=>{
  
  const storage=inject(StorageService);
  const token=storage.profileToken();
  if(token){
    req=req.clone({
      setHeaders:{
        Authorization:`${token}`
      }
    })
    return next(req);
  }
  return next(req)
  // .pipe(catchError());
}