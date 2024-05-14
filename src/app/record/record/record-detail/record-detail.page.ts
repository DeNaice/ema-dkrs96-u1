import {Component, ViewChild} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { IonInput} from "@ionic/angular/standalone";
import {Record} from "../record.model";
@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class RecordDetailPage {
  isEditMode = false;
  pageTitle: any;
  //record = new Record();
  years: number[] = [(2018),(2019),(2020),(2021),(2022),(2023),(2024) ];
  errors = new Map<string, string>();
  @ViewChild('moduleNr')
  private moduleNrRef: IonInput | undefined;


  constructor() { }


  deleteRecord() {

  }

  save() {


  }
}
