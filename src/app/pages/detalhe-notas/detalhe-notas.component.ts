import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotasService } from 'src/app/shared/notas.service';
import { Notas } from 'src/app/shared/note.model';

@Component({
  selector: 'app-detalhe-notas',
  templateUrl: './detalhe-notas.component.html',
  styleUrls: ['./detalhe-notas.component.scss']
})
export class DetalheNotasComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef;

  notas!: Notas;
  notaId!: number;
  nova!: boolean;
  tituloNota!: string;

  constructor(
    private notasService: NotasService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.notas = new Notas();
      if(params['id']){
        this.notas = this.notasService.buscarNotas(params['id']);
        this.notaId = params['id'];
        this.nova = false;
        this.tituloNota = 'Edit Note'
      } else {
        this.nova = true;
        this.tituloNota = 'New Note'
      }
    });

  }
 
  onSubmit(form: NgForm){
    if(this.nova){
      this.notasService.inserirNotas(form.value);
      this.toastr.success('Note created successfully!');
    } else {
      this.notasService.atualizarNotas(this.notaId, form.value.title, form.value.body);
      this.toastr.success('Note updated successfully!');
    }
    this.router.navigateByUrl('/');
  }

  btnCancelar(){
    this.router.navigateByUrl('/');
  }

  gerarPDF() {
   
  }
}