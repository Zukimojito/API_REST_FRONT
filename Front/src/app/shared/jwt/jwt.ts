import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private AuthService: AuthService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.AuthService.userSubject.value;
        if (token) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
        return next.handle(req);
    }
}
