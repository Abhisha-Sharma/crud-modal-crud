import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/tabel/tabel.module').then((m) => m.TabelModule),
      },
];
