import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
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
import { TopicsService } from './services/topics.service';
import { topicResolveFn } from './topic.resolver';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: TopicsComponent,
    pathMatch: 'full',
    children: [{ path: 'create', component: TopicFormComponent }],
  },
  { path: 'create', component: TopicFormComponent },
  {
    path: 'edit/:id',
    component: EditTopicComponent,
    resolve: {
      topic: topicResolveFn,
    },
  },
  {
    path: 'view/:id',
    component: TopicViewComponent,
    resolve: {
      topic: topicResolveFn,
    },
  },
  { path: 'edit-comment', component: EditCommentComponent },
  {
    path: 'topics',
    component: TopicsComponent,
    pathMatch: 'full',
    children: [{ path: 'create', component: TopicFormComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
