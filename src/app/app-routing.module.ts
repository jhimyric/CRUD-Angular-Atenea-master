import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEstudiantesComponent } from './components/create-estudiantes/create-estudiantes.component';
import { ListEstudiantesComponent } from './components/list-estudiantes/list-estudiantes.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-estudiantes', pathMatch: 'full' },
  { path: 'list-estudiantes', component: ListEstudiantesComponent },
  { path: 'create-estudiantes', component: CreateEstudiantesComponent},
  { path: 'editEstudainte/id', component: CreateEstudiantesComponent},
  { path: '**', redirectTo: 'list-estudiantes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
