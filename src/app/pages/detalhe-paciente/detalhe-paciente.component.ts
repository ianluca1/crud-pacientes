import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PacienteService } from 'src/app/shared/pacientes.service';
import { Paciente } from 'src/app/shared/paciente.model';

@Component({
  selector: 'app-detalhe-paciente',
  templateUrl: './detalhe-paciente.component.html',
  styleUrls: ['./detalhe-paciente.component.scss']
})
export class DetalhePacienteComponent implements OnInit {
  paciente!: Paciente;
  pacienteId!: number;
  tituloNota!: string;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.paciente = new Paciente();
      if(params['id']){
        this.paciente = this.pacienteService.buscarPacientes(params['id']);
        this.pacienteId = params['id'];
        this.tituloNota = 'Dados do Paciente'
      }
    });

  }

  btnCancelar(){
    this.router.navigateByUrl('/');
  }
}