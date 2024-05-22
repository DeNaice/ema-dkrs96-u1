import {Component, ViewChild, inject} from '@angular/core';
import {IonicModule, NavController} from "@ionic/angular";
import {IonInput, ModalController} from "@ionic/angular/standalone";
import {ActivatedRoute, Router} from '@angular/router';
import {Record} from "../record.model";
import {RecordService} from "../record.service";
import {FormsModule} from "@angular/forms";
import {ModulePickerComponent} from "../../module/module-picker/module-picker.component";

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class RecordDetailPage {
  isEditMode = false;
  pageTitle: any;
  record: Record = {} as Record
  years: number[] = [(2018), (2019), (2020), (2021), (2022), (2023), (2024)];
  errors = new Map<string, string>();
  @ViewChild('moduleNr')
  private moduleNrRef: IonInput | undefined;


  constructor(private router: Router,
              private recordService: RecordService,
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private modalController: ModalController,) {
    const recordId = route.snapshot.paramMap.get('id');

    if (recordId) {
      this.isEditMode = true;
      Object.assign(this.record, this.recordService.findById(parseInt(recordId, 10)));
      this.pageTitle = 'Leistung bearbeiten';
    } else {
      this.pageTitle = 'Leistung erstellen';
      this.record.year = new Date().getFullYear();
      this.selectModule();
    }
  }

  async selectModule() {
    const modal = await this.modalController.create({
      component: ModulePickerComponent
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data){
      this.record.moduleNr = result.data.nr
      this.record.moduleName = result.data.name
      this.record.crp = result.data.crp
    }

  }


  deleteRecord(record: Record) {
    this.recordService.delete(record.id)
  }

  save() {
    this.errors.clear();
    if (!this.record.moduleNr) {
      this.errors.set('moduleNr', 'Modulnummer darf nicht leer sein!');
    }
    if (!this.record.moduleName) {
      this.errors.set('moduleName', 'Modulname darf nicht leer sein!');
    }
    if (!this.record.crp) {
      this.errors.set('crp', 'Creditpoint darf nicht leer sein!');
    }
    if (!this.record.grade) {
      this.errors.set('note', 'Note darf nicht leer sein!');
    }
    if (this.errors.size === 0) {
      if (this.isEditMode) {
        this.recordService.update(this.record);
      } else {
        this.recordService.persist(this.record);
      }
      this.navCtrl.pop();
    }
  }

    gotorecordlist()
    {
      this.router.navigate(['record-list']);
    }

}
