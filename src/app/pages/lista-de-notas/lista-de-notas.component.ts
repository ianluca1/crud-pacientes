import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/shared/notas.service';
import { Notas } from 'src/app/shared/note.model';

@Component({
  selector: 'app-lista-de-notas',
  templateUrl: './lista-de-notas.component.html',
  styleUrls: ['./lista-de-notas.component.scss']
})
export class ListaDeNotasComponent implements OnInit {

  notas: Notas[] = []

  constructor(private notasService: NotasService) { }

  ngOnInit(): void {
    this.notas = this.notasService.buscarTodasNotas();
  }

  deletarNota(id: number){
    this.notasService.removerNotas(id);
  }

}
