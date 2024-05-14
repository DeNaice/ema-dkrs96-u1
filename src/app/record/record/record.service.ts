import { Record } from './record.model';

export class RecordService {
  private records: Record[] = [];

  persist(record: Record): void {
    this.records.push(record);
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

  delete(id: number | null): boolean {
    const index = this.records.findIndex(record => record.id === id);
    if (index !== -1) {
      this.records.splice(index, 1);
      return true;
    }
    return false;
  }
}
