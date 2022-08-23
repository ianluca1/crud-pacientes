import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
}) 
export class NoteCardComponent implements OnInit, AfterViewInit {

  @Input() title: any;
  @Input() body: any;
  @Input() link: any;

  @Output('delete') onDelete = new EventEmitter();

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(){

  }
 
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

}
