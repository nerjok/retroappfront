import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { TopicViewComponent } from './components/topic-view/topic-view.component';
import { EditCommentComponent } from './components/comments/edit-comment/edit-comment.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: TopicsComponent,
    pathMatch: 'full',
    children: [{ path: 'create', component: TopicFormComponent }],
  },
  { path: 'create', component: TopicFormComponent },
  { path: 'edit', component: TopicFormComponent },
  { path: 'view', component: TopicViewComponent },
  { path: 'edit-comment', component: EditCommentComponent },
  {
    path: 'topics',
    component: TopicsComponent,
    pathMatch: 'full',
    children: [{ path: 'create', component: TopicFormComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
