import { HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, tap, throwError } from "rxjs";

export function responseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const messageService = inject(MessageService);
    const toasterUrls = [
        'topics',
        'comments',
        'users',
    ];
    return next(req).pipe(
        tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log(req.url, 'returned a response with status', event.status);
                if (event.status === 200 && req.method === 'POST') {
                    messageService.add({
                        severity: 'success',
                        summary: 'Data updated',
                        detail: 'To see updated data refresh or preview details...',
                    });
                }
            }
        }),
        catchError(error => {
            console.error('Request failed:', error);
            messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error?.message || 'An error occurred while processing your request',
            });
            return throwError(() => error);
        })
    );

}