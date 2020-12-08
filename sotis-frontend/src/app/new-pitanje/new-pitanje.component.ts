import { Component, OnInit } from '@angular/core';
import { Nastavnik } from '../model/Nastavnik';
import { Odgovor } from '../model/odgovor';
import { Pitanje } from '../model/pitanje';
import { PitanjeDTO } from '../model/PitanjeDTO';
import { Predmet } from '../model/predmet';
import { Test } from '../model/Test';
import { NewQuestionService } from '../services/new-question.service';

@Component({
  selector: 'app-new-pitanje',
  templateUrl: './new-pitanje.component.html',
  styleUrls: ['./new-pitanje.component.css']
})
export class NewPitanjeComponent implements OnInit {

  public hiddenUnosTest: boolean;
  public hiddenUnosPitanja: boolean;
  public hiddenPotvrdaPitanja: boolean;

  public predmetTempTest: String = new String();
  public textTempPitanje: String = new String();
  public textTempOdgovor: String = new String();
  public tacnostTempOdgovor: boolean;


  tempOdgovori: Array<Odgovor> = [];
  tempPitanja: Array<Pitanje> = [];

  predmeti: Array<Predmet> = [];
  odabraniPredmet: Predmet = new Predmet();

  constructor(private newQuestionService: NewQuestionService) {
    this.hiddenUnosTest = false;
    this.hiddenUnosPitanja = true;
    this.hiddenPotvrdaPitanja = true;

    this.tacnostTempOdgovor = false;
   }

  ngOnInit(): void {

    // dobavljanje predmeta za odabir
    this.newQuestionService.getSviPredmeti().subscribe(response => {this.predmeti = response; this.odabraniPredmet = this.predmeti[0]});
    
  }

  public confirmTest(){
    this.hiddenUnosTest = true;
    this.hiddenUnosPitanja = false;
    console.log(this.odabraniPredmet);
    alert(this.odabraniPredmet.naziv);
  }

  public addAnswer(){
    
    var odg = new Odgovor();
    odg.tacnost = this.tacnostTempOdgovor;
    odg.tekst = this.textTempOdgovor;

    this.tempOdgovori.push(odg)

    
    this.textTempOdgovor = "";
    this.tacnostTempOdgovor = false;

  }

  public addQuestion(){
    var question = new Pitanje();
    question.tekst = this.textTempPitanje;

    question.odgovori = this.tempOdgovori;

    this.tempPitanja.push(question)

    this.hiddenUnosTest = true;
    this.hiddenUnosPitanja = true;
    this.hiddenPotvrdaPitanja = false;
    alert(this.odabraniPredmet.id)
  }



  public sendQuestionToBackend(){

    let pitanje: PitanjeDTO = new PitanjeDTO();
    pitanje.tekst = this.textTempPitanje
    pitanje.odgovori = this.tempOdgovori
    pitanje.predmetId = this.odabraniPredmet.id;
    this.newQuestionService.dodajPitanje(pitanje).subscribe();
  }

}
