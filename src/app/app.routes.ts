import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./record/record/record-list/record-list.page').then(m => m.RecordListPage)
  },
  {
    path: 'record-list',
    loadComponent: () => import('./record/record/record-list/record-list.page').then(m => m.RecordListPage)
  },
  {
    path: 'record-detail',
    loadComponent: () => import('./record/record/record-detail/record-detail.page').then( m => m.RecordDetailPage)
  },

];
