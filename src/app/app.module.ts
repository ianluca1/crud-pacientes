import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pages/pagina-principal/pagina-principal.component';
import { PacienteCardComponent } from './paciente-card/paciente-card.component';
import { DetalhePacienteComponent } from './pages/detalhe-paciente/detalhe-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPrintModule } from 'ngx-print';
import { ListaPacienteComponent } from './pages/lista-de-pacientes/lista-de-paciente.component';
import { ModalIncluirAlterarPacienteComponent } from './pages/modal-incluir-alterar-paciente/modal-incluir-alterar-paciente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmacaoComponent } from './pages/modal-confirmacao/modal-confirmacao.component';
@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    ListaPacienteComponent,
    PacienteCardComponent,
    DetalhePacienteComponent,
    ModalIncluirAlterarPacienteComponent,
    ModalConfirmacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPrintModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
