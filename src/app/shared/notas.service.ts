import { Injectable } from '@angular/core';
import { Notas } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  notas: Notas[] = []

  constructor() { }

  buscarTodasNotas() {
    return this.notas;
  }

  buscarNotas(id: number) {
    return this.notas[id];
  }

  buscarIdNotas(nota: Notas) {
    return this.notas.indexOf(nota);
  }

  inserirNotas(nota: Notas) {
    let novoTamanho = this.notas.push(nota);
    let index = novoTamanho - 1;
    return index;
  }

  atualizarNotas(id: number, title: string, body: string) {
    let nota = this.notas[id];
    nota.title = title;
    nota.body = body;
  }

  removerNotas(id: number) {
    this.notas.splice(id, 1);
  }
}
