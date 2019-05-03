import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient,private cookieService: CookieService ) { }

  getCdlists(){
    return this.http.get('http://192.168.0.137:10888/cdlist');
  }

  postLogin(value){
    return this.http.post('http://192.168.0.137:10888/login', JSON.stringify(value), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    ).subscribe(function (response){
      this.cookieService.set('user', response);
    })  
  
  }

  postRegister(value){    
    this.http.post('http://192.168.0.137:10888/registration', JSON.stringify(value), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    ).subscribe(function (response){
      console.log(response.toString);
    })  
  }
  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
  /*private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }*/
 
}
