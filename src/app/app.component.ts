import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cards:{ cardID: number , status:string , path:string, nImm:number, check:boolean }[] = [];
  posizioni:{ n:number, volte:number}[] = [];
  carta1:number;
  carta2:number;
  punteggio:number;
  click:boolean;
  mostra:boolean;
  timer;
  tempo:number;

  ngOnInit(): void {
    this.carta1 = this.carta2 = -1;
    this.punteggio = 0;
    this.click = true;
    this.mostra = false;
    for (var i = 0; i < 2; i++) {this.posizioni.push({n:i, volte:0});}
    for (var i = 0; i < 4; i++) {
      var x = Math.floor(Math.random() * 2); //da 0 a 9
      while (this.posizioni[x].volte == 2) {
        x = Math.floor(Math.random() * 2);
      }
      this.posizioni[x].volte++;
      this.cards.push({
        cardID: i, status:'default', path:'./assets/images/default.png', nImm: x, check:false
      });
    }
    this.tempo = 0;
    this.timer = setInterval(() => this.tempo++, 1000);
  }

  fromFiglioEvntHandlr( evntData: { cardID: number , status:string , path:string, check:boolean } ){
    if (!evntData.check && this.click) {
      if (this.cards[evntData.cardID].status=='default') {
        this.cards[evntData.cardID].status='flipped'
        this.cards[evntData.cardID].path='./assets/images/' + this.cards[evntData.cardID].nImm + '.jpg'
      } else {
        this.cards[evntData.cardID].status='default'
        this.cards[evntData.cardID].path='./assets/images/default.png'
      }

      if (this.carta1 == -1) {
        this.carta1 = evntData.cardID;
        this.cards[evntData.cardID].check = true;
      } else if (this.carta1 != -1 && this.carta2 == -1) {
        this.carta2 = evntData.cardID;
        if (this.cards[this.carta1].nImm == this.cards[this.carta2].nImm) {
          this.cards[this.carta1].check = true;
          this.cards[this.carta2].check = true;
          this.carta1 = this.carta2 = -1;
          this.punteggio++;
          this.controllo();
        } else {
          this.cards[this.carta1].check = false;
          this.click = false;
          setTimeout(() => {
            this.cards[this.carta1].status='default';
            this.cards[this.carta1].path='./assets/images/default.png';
            this.cards[this.carta2].status='default';
            this.cards[this.carta2].path='./assets/images/default.png';
            this.click = true;
            this.carta1 = this.carta2 = -1;
          }, 1000);
        }
      }
    }
  }

  controllo() {
    var vinto = true;
    this.cards.forEach(x => {
      if (!x.check) vinto = false;
    });
    if (vinto) {
      clearInterval(this.timer);
      this.mostra = true;
    }
  }

  reset() {
    this.carta1 = this.carta2 = -1;
    this.punteggio = 0;
    this.click = true;
    this.mostra = false;
    for (var i = 0; i < 2; i++) {this.posizioni[i] = {n:i, volte:0};}
    for (var i = 0; i < 4; i++) {
      var x = Math.floor(Math.random() * 2); //da 0 a 9
      while (this.posizioni[x].volte == 2) {
        x = Math.floor(Math.random() * 2);
      }
      this.posizioni[x].volte++;
      this.cards[i] = {
        cardID: i, status:'default', path:'./assets/images/default.png', nImm: x, check:false
      };
    }
    this.tempo = 0;
    this.timer = setInterval(() => this.tempo++, 1000);
  }
}
