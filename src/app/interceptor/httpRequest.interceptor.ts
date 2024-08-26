import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { catchError, throwError } from "rxjs";
import { error } from "@ant-design/icons-angular";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

export const httpRequest:HttpInterceptorFn=(req,next)=>{
  const toastr=inject(ToastrService);
  const storage=inject(StorageService);
  const router=inject(Router);
  const token=storage.profileToken();
  if(token){
    req=req.clone({
      setHeaders:{
        Authorization:`${token}`
      }
    })
    // return next(req);
  }
  return next(req).pipe(catchError((error:HttpErrorResponse)=>{
    if(error.statusText=='Session Expired'){
      toastr.error(error.statusText);
      localStorage.removeItem("profileToken");
      router.navigate(['/login'])
    }
    return throwError(()=>error)
  }))
  // .pipe(catchError());
}