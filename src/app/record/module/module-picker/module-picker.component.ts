import { Component, OnInit, ViewChild } from '@angular/core';
import {Record} from "../../record/record.model";
import {RecordService} from "../../record/record.service";
import {IonContent, IonHeader, IonItem, IonList, IonSearchbar, ModalController} from "@ionic/angular/standalone";
import {Module} from "../module.model";
import {ModuleService} from "../module.service";
@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.component.html',
  styleUrls: ['./module-picker.component.scss'],
  imports: [
    IonHeader,
    IonSearchbar,
    IonContent,
    IonList,
    IonItem
  ],
  standalone: true
})
export class ModulePickerComponent {

  modules: Module[] = [];
  filteredModules: Module[] = [];
  searchbarVisible = false;

  #searchbar: IonSearchbar | undefined;
  @ViewChild(IonSearchbar)

  set searchbar(sb: IonSearchbar) {
    if (sb) {
      sb.setFocus();
      setTimeout(() => sb.setFocus(), 1);
      this.#searchbar = sb;
    }

  }

  constructor(protected modalController: ModalController,
              private moduleService: ModuleService) {
    this.modules = moduleService.findAll();
    this.filteredModules = this.modules;
    this.moduleService.load();
  }


  doSearch() {

 this.filteredModules = this.modules.filter(m => m.moduleName.toLowerCase())

  }

  cancelSearch(){

    this.searchbar.value = ""
    this.searchbarVisible = false;
  }

}
