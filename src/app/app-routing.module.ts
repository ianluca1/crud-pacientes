import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheNotasComponent } from './pages/detalhe-notas/detalhe-notas.component';
import { ListaDeNotasComponent } from './pages/lista-de-notas/lista-de-notas.component';
import { PaginaPrincipalComponent } from './pages/pagina-principal/pagina-principal.component';

const routes: Routes = [
  {path: '', component: PaginaPrincipalComponent, children:[
    {path: '', component: ListaDeNotasComponent},
    {path: 'new', component: DetalheNotasComponent},
    {path: ':id', component: DetalheNotasComponent},
    {path: 'update/:id', component: DetalheNotasComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
