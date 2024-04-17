import { Record } from './record.model';

export class Statistic {
  private _records: Record[];

  constructor(records: Record[]) {
    this._records = records;
  }

  get recordCount(): number {
    return this._records.length;
  }

  get hwCount(): number {
    return this._records.filter(record => record.halfWeighted).length;
  }

  get sumCrp(): number {
    return this._records.reduce((sum, record) => sum + record.crp, 0);
  }

  get crpToEnd(): number {
    const totalCrpNeeded = 180; // Assuming total credits needed for graduation
    return totalCrpNeeded - this.sumCrp;
  }

  get averageGrade(): number {
    if (this._records.length === 0) return 0;

    const totalGrades = this._records.reduce((sum, record) => sum + record.grade, 0);
    return Math.round(totalGrades / this._records.length);
  }
}
