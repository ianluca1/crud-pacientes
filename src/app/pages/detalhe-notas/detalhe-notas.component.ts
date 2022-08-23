import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotasService } from 'src/app/shared/notas.service';
import { Notas } from 'src/app/shared/note.model';

@Component({
  selector: 'app-detalhe-notas',
  templateUrl: './detalhe-notas.component.html',
  styleUrls: ['./detalhe-notas.component.scss']
})
export class DetalheNotasComponent implements OnInit {

  notas!: Notas;
  notaId!: number;
  nova!: boolean;

  constructor(
    private notasService: NotasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.notas = new Notas();
      if(params['id']){
        this.notas = this.notasService.buscarNotas(params['id']);
        this.notaId = params['id'];
        this.nova = false;
      } else {
        this.nova = true;
      }
    });

  }
 
  onSubmit(form: NgForm){
    if(this.nova){
      this.notasService.inserirNotas(form.value);
    } else {
      this.notasService.atualizarNotas(this.notaId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl('/');
  }

  btnCancelar(){
    this.router.navigateByUrl('/');
  }

}