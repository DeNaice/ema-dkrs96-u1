import {Injectable} from '@angular/core';
import {Module} from "./module.model";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  modules: Module[];


  static MODULES_URL = 'https://ema-thm.github.io/modules.json';

  constructor(private http: HttpClient) {
    const modulesJSON = localStorage.getItem('modules');
    if (modulesJSON) {
      this.modules = JSON.parse(modulesJSON);
    } else {
      // init storage with test data
      this.modules = [];
      // nr, name, crp
      this.modules.push(new Module('CS1019', 'Compilerbau', 6));
      this.save();
    }
  }

  findAll(): Module[] {
    return this.modules;
  }

  private save(): void {
    localStorage.setItem('modules', JSON.stringify(this.modules));
  }

  load() {
    const modulesLastModified = localStorage.getItem('modulesLastModified');
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

    const now = Date.now();
    const lastExecutionTime = parseInt(modulesLastModified || '0', 10);
    const timeSinceLastExecution = now - lastExecutionTime;

    if (timeSinceLastExecution >= twentyFourHoursInMilliseconds || !modulesLastModified) {
      this.http.get<Module[]>(ModuleService.MODULES_URL, {
        observe: 'response',
        headers: modulesLastModified ? {'If-Modified-Since': modulesLastModified} : {}
      }).subscribe({
        next: (response: HttpResponse<Module[]>) => {
          const newModules = response.body;

          if (newModules) {
            this.modules.splice(0, this.modules.length, ...newModules);
          }

          localStorage.setItem('modulesLastModified', now.toString());
          this.save();
        },
        error: (e: HttpErrorResponse) => {
          console.log("Error: " + e.message);
        }
      });
    } else {
      console.log("24 hours have not passed.");
    }

  }
}
