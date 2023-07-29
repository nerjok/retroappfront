import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
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
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopicsComponent,
    TopicFormComponent,
    TopicViewComponent,
    CreateCommentComponent,
    EditCommentComponent,
    EditTopicComponent,
    RegisterComponent,
    AuthFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SimpleFormGroupComponent,
    FontAwesomeModule
  ],
  providers: [
    provideHttpClient(),
    // provideRouter(routes, withComponentInputBinding()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
