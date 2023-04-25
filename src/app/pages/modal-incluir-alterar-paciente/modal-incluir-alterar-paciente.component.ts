import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/shared/pacientes.service';

@Component({
  selector: 'app-modal-incluir-alterar-paciente',
  templateUrl: './modal-incluir-alterar-paciente.component.html',
  styleUrls: ['./modal-incluir-alterar-paciente.component.scss']
})
export class ModalIncluirAlterarPacienteComponent {
  @ViewChild('modal_incluir_alterar_paciente') private modalContent: TemplateRef<ModalIncluirAlterarPacienteComponent> | undefined;
  public modalRef!: NgbModalRef;
  formGroup: FormGroup;
  pacienteId: any;
  submited: boolean = false;
  novoPaciente: boolean = true;
  paciente: any;

  constructor(
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastr: ToastrService,
    private pacienteService: PacienteService,

  ) { 
    this.formGroup = this.formBuilder.group({
      nomePaciente: [ '', [ Validators.required, Validators.minLength(1), ], ],
      idadePaciente: [ '', [ Validators.required, Validators.minLength(1), ], ],
      generoPaciente: [ '', [ Validators.required, Validators.minLength(1), ], ],
    });
  }

  open(paciente?: any): Promise<boolean> {        
    this.formGroup.reset();    
    if(paciente !== undefined){
      this.paciente = this.pacienteService.buscarPacientes(paciente);
      this.pacienteId = paciente;
      this.novoPaciente = false;
      this.formGroup.controls['nomePaciente'].setValue(this.paciente.nomePaciente);
      this.formGroup.controls['idadePaciente'].setValue(this.paciente.idadePaciente);
      this.formGroup.controls['generoPaciente'].setValue(this.paciente.generoPaciente);
    }
    return new Promise<boolean>(resolve =>{
      this.modalRef = this.modalService.open(this.modalContent, {keyboard: true, centered: true})
      this.modalRef.result.then(resolve, resolve);
    })
  }

  cancel(){
    this.formGroup.reset();
    this.modalRef?.dismiss();
  }

  submit(){
    this.paciente = this.formGroup.value;
    if(this.novoPaciente){
      this.pacienteService.inserirPacientes(this.paciente);
      this.toastr.success('Paciente Criado com Sucesso!');
    } else {
      this.pacienteService.atualizarPacientes(this.pacienteId, this.paciente.nomePaciente, this.paciente.idadePaciente, this.paciente.generoPaciente);
      this.toastr.success('Paciente Atualizado com Sucesso!');
    }
    this.modalRef?.dismiss();
  }

}
