import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./record/record-list/record-list.page').then( m => m.RecordListPage)
  },
  {
    path: 'record-list',
    loadComponent: () => import('./record/record-list/record-list.page').then( m => m.RecordListPage)
  },
];
