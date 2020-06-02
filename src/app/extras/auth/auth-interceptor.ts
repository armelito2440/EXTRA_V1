import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('interceptor');
    const authToken = this.auth.getToken();
    if (authToken.length > 0) {
    console.log('interceptor token', authToken);
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
    console.log('authToken', authRequest);
        return next.handle(authRequest);
    }
    return next.handle(req);

  }
}
