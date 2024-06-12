import {Record} from './record.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {


  
  private records: Record[] = [];
  private nextId: number;

  constructor() {
    const recordsJSON: string | null = localStorage.getItem('records');
    if (recordsJSON) {
      this.records = JSON.parse(recordsJSON);
      this.nextId = parseInt(localStorage.getItem('nextId') ?? "1", 10);
    } else {
      this.records = [];
      this.nextId = 1;
    }
  }


  persist(record: Record): void {
    record.id = this.nextId++;
    this.records.push(record);
    this.save();
  }

  findAll(): Record[] {
    return this.records;
  }

  findById(id: number | null): Record | undefined {
    return this.records.find(record => record.id === id);
  }


  update(record: Record): boolean {
    const index = this.records.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.records[index] = record;
      return true;
    }
    return false;
  }

  private save(): void {
    localStorage.setItem('records', JSON.stringify(this.records));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  delete(id: number | null): boolean {
    if (id == null) {
      return false
    }
    const index = this.records.findIndex(record => record.id === id);
    if (index !== -1) {
      this.records.splice(index, 1);
      this.save()
      return true;
    }
    return false;
  }

  load() {

  }
}
