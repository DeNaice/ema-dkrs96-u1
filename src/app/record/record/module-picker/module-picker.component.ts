import { Component, OnInit, ViewChild } from '@angular/core';
import {Record} from "../record.model";
import {RecordService} from "../record.service";
import {IonSearchbar} from "@ionic/angular/standalone";
@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.component.html',
  styleUrls: ['./module-picker.component.scss'],
})
export class ModulePickerComponent {

  record: Record[] = [];
  filteredModules: Record[] = [];
  searchbarVisible = false;

  #searchbar: IonSearchbar | undefined;
  modalController: any;
  @ViewChild(IonSearchbar)

  set searchbar(sb: IonSearchbar) {
    if (sb) {
      sb.setFocus();
      setTimeout(() => sb.setFocus(), 1);
      this.#searchbar = sb;
    }

  }

  constructor(private recordService: RecordService) {
    this.record = recordService.findAll();
    this.filteredModules = this.record;
    this.recordService.load();
  }


  doSearch() {

  }

  cancelSearch(){

  }

}
