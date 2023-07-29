import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of, Subject, take, tap } from 'rxjs';
import { CustomModalService } from './custom-modal.service';
import { ModalCloseReason, ModalCloseType, ModalOptions, MODAL_DATA } from './modal.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  static MODAL_DATA = new InjectionToken<string>('MODAL_DATA');

  constructor(
    private modalProvider: NgbModal,
    private environmentInjector: EnvironmentInjector,
    private customModalService: CustomModalService,
    private appRef: ApplicationRef
  ) {}

  public show<T, R = unknown>(
    component: Type<unknown>,
    options: ModalOptions<T> = {}
  ): Observable<ModalCloseReason<R>> {
    const injector = this.configureInjector(options);
    const modalResultPromise = this.modalProvider.open(component, { injector, ...options });

    return this.getModalResponse<R>(modalResultPromise);
  }

  public showCustomModal<T = any>(componentClass: Type<any>, options: ModalOptions<T> = {}): Observable<unknown> {
    const component = createComponent(componentClass, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.configureInjector(options),
    });

    document.body.appendChild(component.location.nativeElement);
    this.appRef.attachView(component.hostView);

    const resultSubject$ = new Subject();

    this.customModalService.modalResponse$
      .pipe(
        tap(() => {
          component.destroy();
        }),
        take(1)
      )
      .subscribe(resultSubject$);

    return resultSubject$.pipe(take(1));
  }

  private configureInjector<T>(options: ModalOptions<T>): Injector {
    return Injector.create({
      providers: [{ provide: MODAL_DATA, useValue: options?.data }],
      parent: options.injector ?? this.environmentInjector,
    });
  }

  private getModalResponse<R>(ngbModalRef: NgbModalRef): Observable<ModalCloseReason<R>> {
    return from(
      ngbModalRef.result
        .then((result) => ({
          modalCloseType: ModalCloseType.CLOSE,
          result,
        }))
        .catch((result) => ({ modalCloseType: ModalCloseType.DISMISS, result }))
    );
  }
}
