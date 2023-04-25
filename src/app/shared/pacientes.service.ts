import { Injectable } from '@angular/core';
import { Paciente } from './paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacientes: Paciente[] = []

  constructor() { }

  buscarTodasPacientes() {
    return this.pacientes;
  }

  buscarPacientes(id: number) {
    return this.pacientes[id];
  }

  buscarIdPacientes(paciente: Paciente) {
    return this.pacientes.indexOf(paciente);
  }

  inserirPacientes(paciente: Paciente) {
    let novoTamanho = this.pacientes.push(paciente);
    let index = novoTamanho - 1;
    return index;
  }

  atualizarPacientes(id: number, nomePaciente: string, idadePaciente: number, generoPaciente: string) {
    let paciente = this.pacientes[id];
    paciente.nomePaciente = nomePaciente;
    paciente.idadePaciente = idadePaciente;
    paciente.generoPaciente = generoPaciente;
  }

  removerPacientes(id: number) {
    this.pacientes.splice(id, 1);
  }
}
