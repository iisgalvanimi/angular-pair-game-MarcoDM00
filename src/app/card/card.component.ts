import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()  cardData:{ cardID: number , status:string , path:string, check:boolean }
  @Output() fromFiglioEvnt = new EventEmitter<{ cardID: number , status:string , path:string, check:boolean }>();

  constructor() { }

  ngOnInit(): void { }

  flipCard() { 
    // gestione dell'evento da inviare al padre
    this.fromFiglioEvnt.emit( this.cardData )
  }
}
