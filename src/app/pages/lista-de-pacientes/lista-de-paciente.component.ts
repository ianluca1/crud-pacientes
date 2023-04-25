import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/shared/pacientes.service';
import { Paciente } from 'src/app/shared/paciente.model';
import { ModalIncluirAlterarPacienteComponent } from '../modal-incluir-alterar-paciente/modal-incluir-alterar-paciente.component';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-lista-de-paciente',
  templateUrl: './lista-de-paciente.component.html',
  styleUrls: ['./lista-de-paciente.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': '0',
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(68)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(0.85)',
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75,
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0',
        })),
      ])
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0,
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ]),
  ]
})
export class ListaPacienteComponent implements OnInit {

  @ViewChild('modal_incluir_alterar_paciente', { static: false }) public MODAL_INCLUIR_ALTERAR_PACIENTE!: ModalIncluirAlterarPacienteComponent | undefined;
  @ViewChild('modal_confirmacao', { static: false }) public MODAL_CONFIRMACAO!: ModalConfirmacaoComponent | undefined;
  
  paciente: Paciente[] = [];
  pacienteFiltrado: Paciente[] = [];
  busca: any;
  pacienteId: any;

  constructor(private pacienteService: PacienteService
    ) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.buscarTodasPacientes();
    this.pacienteFiltrado = this.paciente;
  }

  abrirModalConfirmacao(id: number){
    this.MODAL_CONFIRMACAO?.open(id);
  }

  atualizarPaciente(id: number){
    this.MODAL_INCLUIR_ALTERAR_PACIENTE?.open(id);
  }

  abrirModal(){
    this.MODAL_INCLUIR_ALTERAR_PACIENTE?.open();
  }

  visualizarPaciente(id: number){
    // this.sessionService.setItem("compromissoSelecionado", this.compromissoSelecionado);
    // this.router.navigateByUrl("/compromissos/form");  
  }

  buscarPacientePorNome(query: any) {
    this.busca = query.target.value;

    if (this.busca.length < 1) {
      this.pacienteFiltrado = this.paciente
    } else {
      let allResults: Paciente[] = new Array<Paciente>();
      let search: string[] = this.busca.split(' ');
      search = this.removeDuplicates(search);
      search.forEach(term => {
        let results: Paciente[] = this.relevantNotes(term);
        allResults = [...allResults, ...results]
      })

      let uniqueResults = this.removeDuplicates(allResults)
      this.pacienteFiltrado = uniqueResults;
    }
  }

  removeDuplicates(arr: Array<any>){
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e))
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string){
    query = query.toLowerCase().trim();
    let relevantNotes = this.paciente.filter(paciente => {
      if(paciente.nomePaciente.toLowerCase().includes(query) || paciente.idadePaciente.toString().includes(query) || paciente.generoPaciente.toLowerCase().includes(query)){
        return true
      }
      return false;
    })

    return relevantNotes;
  }
}