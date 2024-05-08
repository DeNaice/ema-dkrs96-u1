import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Record} from "../record.model";
import {Statistic} from "../statistic.model";
import {
  IonButton, IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonItem,
  IonList,
  IonNav,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonNav, IonIcon, IonList, IonItem, IonButtons]
})
export class RecordListPage {

  records: Record[] = [];

  constructor() {
    this.records.push(
      new Record(1, 'CS000', 'Test', 6, 69, false, true, 2010),
      new Record(2, 'CS001', 'Test2', 6, 85, false, false, 2011)
    );
  }



  logKennzahlen(){

    const stats = new Statistic(this.records);

    console.log('Anzahl der Datensätze:', stats.recordCount);
    console.log('Anzahl der halbgewichteten Datensätze:', stats.hwCount);
    console.log('Summe der Leistungspunkte:', stats.sumCrp);
    console.log('Fehlende Leistungspunkte bis zum Abschluss:', stats.crpToEnd);
    console.log('Durchschnittsnote:', stats.averageGrade);


  }

  createRecord(): void {
    console.log('Not implemented yet! � ');
  }
  showStats(): void {
    console.log('Not implemented yet! � ');
  }

}
