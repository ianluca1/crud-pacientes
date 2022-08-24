import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotasService } from 'src/app/shared/notas.service';
import { Notas } from 'src/app/shared/note.model';

@Component({
  selector: 'app-lista-de-notas',
  templateUrl: './lista-de-notas.component.html',
  styleUrls: ['./lista-de-notas.component.scss'],
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
export class ListaDeNotasComponent implements OnInit {

  notas: Notas[] = [];
  notasFiltradas: Notas[] = [];
  busca: any;

  constructor(private notasService: NotasService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.notas = this.notasService.buscarTodasNotas();
    this.notasFiltradas = this.notas;
  }

  deletarNota(id: number) {
    this.notasService.removerNotas(id);
    this.toastr.success('Note deleted successfully!');
  }

  buscarNota(query: any) {
    this.busca = query.target.value;
    if (this.busca.length < 1) {
      this.notasFiltradas = this.notas;
    } else {
      this.notasFiltradas = this.notas.filter(notas => notas.title == this.busca)
    }
  }
}