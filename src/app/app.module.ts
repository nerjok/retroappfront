import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, withInterceptors, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleFormGroupComponent } from './shared/components/simple-form-group/simple-form-group.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicViewComponent } from './components/topic-view/topic-view.component';
import { CreateCommentComponent } from './components/comments/create-comment/create-comment.component';
import { EditCommentComponent } from './components/comments/edit-comment/edit-comment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { ModalModule } from './shared/components/modal/modal.module';
import { TopicStatusPipe } from './shared/pipes/topic-status.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { DueDateColorDirective } from './shared/directives/due-date-color.directive';
import { ToastModule } from 'primeng/toast';
import { responseInterceptor } from './interceptors/requests.interceptor';
import { MessageService } from 'primeng/api';
import { CommentComponent } from './components/comments/comment/comment.component';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopicsComponent,
    TopicViewComponent,
    // CreateCommentComponent,
    EditCommentComponent,
    EditTopicComponent,
    RegisterComponent,
    AuthFormComponent,
    MainInfoComponent,
    EditModalComponent,
    DueDateColorDirective,
  ],
  bootstrap: [AppComponent], imports: [
    TopicStatusPipe,
    PaginatorModule ,
    MainPageComponent,
    TopicFormComponent,
    CreateCommentComponent,
    CommentComponent,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SimpleFormGroupComponent,
    FontAwesomeModule,
    ModalModule,
    NgSelectModule,
    ToastModule,
    BrowserAnimationsModule], 
    providers: [
      MessageService,
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'system',
                    cssLayer: false
                }
            }
        }),
      provideHttpClient(withInterceptors([responseInterceptor])),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
