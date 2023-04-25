import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.scss']
}) 
export class PacienteCardComponent implements AfterViewInit {

  @Input() nomePaciente: any;
  @Input() idadePaciente: any;
  @Input() generoPaciente: any;
  @Input() link: any;

  @Output('deletar') onDelete = new EventEmitter();
  @Output('atualizar') onEdit = new EventEmitter();
  @Output('visualizar') onView = new EventEmitter();

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }
 
  ngAfterViewInit(){
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  clickBotaoDeletar(){
    this.onDelete.emit();
  }

  clickBotaoDetalhar(){
    this.onView.emit();
  }

  clickBotaoAtualizar(){
    this.onEdit.emit();
  }

}
