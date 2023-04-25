import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhePacienteComponent } from './pages/detalhe-paciente/detalhe-paciente.component';
import { PaginaPrincipalComponent } from './pages/pagina-principal/pagina-principal.component';
import { ListaPacienteComponent } from './pages/lista-de-pacientes/lista-de-paciente.component';

const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent, children:[
    {path: '', component: ListaPacienteComponent},
    {path: ':id', component: DetalhePacienteComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
