import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/shared/pacientes.service';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent {
  @ViewChild('modal_incluir_alterar_paciente') private modalContent: TemplateRef<ModalConfirmacaoComponent> | undefined;
  public modalRef!: NgbModalRef;
  formGroup: FormGroup;
  pacienteId: any;

  constructor(    
    public modalService: NgbModal,
    public toastr: ToastrService,
    private pacienteService: PacienteService,
    private formBuilder: FormBuilder,
) {
  this.formGroup = this.formBuilder.group({
    idPaciente: [''],
  });
}

  open(paciente?: any): Promise<boolean> {        
    this.formGroup.reset(); 
    this.pacienteId = paciente;   
    return new Promise<boolean>(resolve =>{
      this.modalRef = this.modalService.open(this.modalContent, {keyboard: true, centered: true})
      this.modalRef.result.then(resolve, resolve);
    })
  }

  cancel(){
    this.formGroup.reset();
    this.modalRef?.dismiss();
  }

  deletarPaciente(){
    this.pacienteService.removerPacientes(this.pacienteId);
    this.toastr.success('Paciente Deletado com Sucesso!');
    this.modalRef?.dismiss();
  }

}

