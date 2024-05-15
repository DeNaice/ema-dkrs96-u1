import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Record} from "../record.model";
import {Statistic} from "../statistic.model";
import {
  AlertController,
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList,
  IonNav,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import {RecordService} from "../record.service";

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonNav, IonButtons, IonIcon, IonList, IonItem, IonAlert, IonItemSliding, IonItemOptions, IonItemOption]
})
export class RecordListPage {
  message: string = "Hier fügen wir den Rest ein "
  records: Record[] = [];

  constructor(private router: Router,
              private alertController: AlertController,
              private recordService: RecordService) {
    this.records.push(
      new Record(1, 'CS000', 'Compilerbau', 6, 69, false, true, 2021),
      new Record(2, 'CS001', 'Webbasierte Systeme 2', 6, 100, false, false, 2024)
    );
  }


  createRecord() {
    this.router.navigate(['record-detail']);
  }

  editRecord({record}: { record: Record }) {
    this.router.navigate(['record-detail', {id: record.id}]);
  }


  getStatisticsMessage() {
    return `
      Anzahl der Datensätze:
      Anzahl der halbgewichteten Datensätze:
      Summe der Leistungspunkte:
      Fehlende Leistungspunkte bis zum Abschluss:
      Durchschnittsnote:
    `;
  }

  async showDeleteConfirmation(record: Record): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Willst du die Leistung wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'Löschen',
          handler: () => {
            this.deleteRecord(record);
          },
        },
      ],
    });
    await alert.present();

  }

  private deleteRecord(record: Record) {

    this.recordService.delete(record.id)
    this.recordService.findAll()

  }
}
