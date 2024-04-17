import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {Record} from '../record.model'

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecordListPage {

  records: Record[] = [];

  constructor() {
    // id, moduleNr, moduleName, crp, grade, halfWeighted, summerTerm, year
    this.records.push(
      new Record(1, 'CS000', 'Test', 6, 69, false, true, 2010)
    )
  }

  createRecord(): void {
    console.log('CreateRecord not implemented');
  }
  showStats(): void {
    console.log('ShowStats not implemented')
  }

}
