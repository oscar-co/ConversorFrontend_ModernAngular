import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Basic ' + btoa('admin:admin123')
    }
  });
  return next(authReq);
};