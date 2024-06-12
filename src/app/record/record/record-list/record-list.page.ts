import {Component, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Record} from "../record.model";
import {Router} from '@angular/router';
import {RecordService} from "../record.service";
import {Statistic} from "../statistic.model";
import {Share} from '@capacitor/share';
import {
  AlertController,
  IonAlert,
  IonButton,
  IonButtons, IonCard, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList,
  IonNav, IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonNav, IonButtons, IonIcon, IonList, IonItem, IonAlert, IonItemSliding, IonItemOptions, IonItemOption, IonCard, IonCardHeader, IonCardTitle, IonSearchbar]
})

export class RecordListPage {
  records: Record[] = [];
  statistic: Statistic
  searchbarVisible: boolean;
  filteredRecords: Record[] = [];

  #searchbar: IonSearchbar | undefined;
  @ViewChild(IonSearchbar)
  set searchbar(sb: IonSearchbar) {
    if (sb) {
      sb.setFocus();
      this.#searchbar = sb;
    }

  }
  constructor(private router: Router,
              private alertController: AlertController,
              private recordService: RecordService) {
    this.records = recordService.findAll()
    this.statistic = new Statistic(this.records)
    this.searchbarVisible = false;
    this.filteredRecords = [...this.records];
  }


  createRecord() {
    this.router.navigate(['record-detail']);
  }

  editRecord({record}: { record: Record }) {
    this.router.navigate(['record-detail', {id: record.id}]);
  }


  getStatisticsMessage() {
    return `
      Anzahl der Datensätze: ${this.statistic.recordCount}
      Anzahl der halbgewichteten Datensätze: ${this.statistic.hwCount}
      Summe der Leistungspunkte: ${this.statistic.sumCrp}
      Fehlende Leistungspunkte bis zum Abschluss: ${this.statistic.crpToEnd}
      Durchschnittsnote: ${this.statistic.averageGrade}
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

  shareRecords() {
    const records = this.recordService.findAll();
    let msgText = records.map(record => `${record.moduleName} ${record.grade}%`).join('\n');

    Share.canShare().then(canShare => {
      if (canShare.value) {
        Share.share({
          title: 'Meine Studienleistungen',
          text: msgText,
          dialogTitle: 'Leistungen teilen'
        }).then((v) => console.log('ok: ', v))
          .catch(err => console.log(err));
      } else {
        console.log('Error: Sharing not available!');
      }
    });
  }

  showSearchbar() {
    this.searchbarVisible = true;

  }

  cancelSearch() {
    this.searchbarVisible = false;
  }

  doSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (!searchTerm) {
      this.filteredRecords = [...this.records];
      return;
    }

    this.filteredRecords = this.records.filter(record =>
      record.moduleName.toLowerCase().includes(searchTerm)
    );
  }

}
