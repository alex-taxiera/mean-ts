import { NgModule } from '@angular/core'
import {
  Routes,
  RouterModule,
} from '@angular/router'

import { NotFoundComponent } from './pages/not-found/not-found.component'
import { TypesComponent } from './pages/types/types.component'
import { HomeComponent } from './pages/home/home.component'
import { TypeDetailsComponent } from './pages/type-details/type-details.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'types',
    children: [
      {
        path: '',
        component: TypesComponent,
      },
      {
        path: ':name',
        component: TypeDetailsComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
