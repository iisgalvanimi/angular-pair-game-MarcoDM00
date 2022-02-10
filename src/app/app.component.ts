import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-card-game';
  cards:{ cardID: number , status:string , path:string, nImm:number }[] = [];
  posizioni:{ n:number, volte:number}[] = [
    {n:0, volte:0}, {n:1, volte:0}, {n:2, volte:0}, {n:3, volte:0},{n:4, volte:0},
    {n:5, volte:1}, {n:6, volte:0}, {n:7, volte:1}, {n:8, volte:0}, {n:9, volte:0}
  ];

  ngOnInit(): void {
    for (var i = 0; i < 20; i++) {
      var x = 0;
      //do {
        x = Math.floor(Math.random() * 10); //da 0 a 9
      //} while (this.posizioni[x].volte == 2);
      this.posizioni[x].volte++;
      this.cards.push({
        cardID: i, status:'default', path:'./assets/images/default.png', nImm: x
      });
    }
    console.log(this.posizioni);
  }

  fromFiglioEvntHandlr( evntData: { cardID: number , status:string , path:string } ){
    console.log("Sono il padre: dal figlio numero " + evntData.cardID + " ho ricevuto status="+evntData.status)
    if (this.cards[evntData.cardID].status=='default') {
      this.cards[evntData.cardID].status='flipped'
      this.cards[evntData.cardID].path='./assets/images/' + this.cards[evntData.cardID].nImm + '.jpg'
    } else {
      this.cards[evntData.cardID].status='default'
      this.cards[evntData.cardID].path='./assets/images/default.png'
    }
  }
}
