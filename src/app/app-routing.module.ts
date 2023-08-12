import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicViewComponent } from './components/topic-view/topic-view.component';
import { EditCommentComponent } from './components/comments/edit-comment/edit-comment.component';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { topicResolveFn } from './topic.resolver';
import { RegisterComponent } from './components/register/register.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { AuthService } from './services/auth.service';
import { MainPageComponent } from './components/main-page/main-page.component';

const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isloggedIn = inject(AuthService).authToken;
  if (!isloggedIn) inject(Router).navigateByUrl('login');
  console.log('[isLoggedIn]', isloggedIn);

  return !!isloggedIn;
};
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainInfoComponent,
    canActivate: [canActivate],
    // pathMatch: 'full',
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainPageComponent },
      {
        path: 'create',
        component: TopicFormComponent,
      },
      {
        path: 'edit/:id',
        component: EditTopicComponent,
        resolve: {
          topic: topicResolveFn,
        },
      },
      { path: 'edit-comment', component: EditCommentComponent },
      {
        path: 'topics',
        component: TopicsComponent,
        // pathMatch: 'full',
        children: [
          { path: 'create', component: TopicFormComponent },
          {
            path: 'view/:id',
            component: TopicViewComponent,
            resolve: {
              topic: topicResolveFn,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
