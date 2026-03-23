import { Routes } from '@angular/router';
import { QuestionListComponent } from './components/question-list/question-list';
import { QuestionForm } from './components/question-form/question-form';

export const routes: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'questions/:action', component: QuestionForm }
];