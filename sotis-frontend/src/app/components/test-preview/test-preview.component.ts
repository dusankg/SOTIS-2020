import { Component, OnInit } from '@angular/core';
import { Pitanje } from 'src/app/model/pitanje';
import { Predmet } from 'src/app/model/predmet';
import { Test } from 'src/app/model/test';
import { PageEvent } from '@angular/material/paginator';
import { Odgovor } from 'src/app/model/Odgovor';

@Component({
  selector: 'app-test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.css']
})
export class TestPreviewComponent implements OnInit {

  test: Test;
  testSize: number = 0;
  studentAnswers!: Test;

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent;


  constructor() {

    this.test = new Test();
    var pitanje1 = new Pitanje();
    pitanje1.tekst = "blabla"
    var odgovor11 = new Odgovor();
    odgovor11.tekst = "tekstOdgovora1"
    odgovor11.tacnost = true;
    pitanje1.odgovori.push(odgovor11);
    var pitanje2 = new Pitanje();
    pitanje2.tekst = "blabla2"
    var odgovor21 = new Odgovor();
    odgovor21.tekst = "tekstOdgovora2"
    odgovor21.tacnost = false;
    pitanje2.odgovori.push(odgovor21);
    this.test.pitanje.push(pitanje1);
    this.test.pitanje.push(pitanje2);


    this.pageEvent.pageIndex = 0

    this.studentAnswers = this.test
    for (let p of this.studentAnswers.pitanje) {
      for (let o of p.odgovori) {
        o.tacnost = false;
      }
    }

  }

  ngOnInit(): void {

  }

  submit() {
    console.log(this.studentAnswers)
  }


}
