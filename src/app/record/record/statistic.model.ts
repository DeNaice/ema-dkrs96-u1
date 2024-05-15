import { Record } from './record.model';

export class Statistic {
  private readonly _records: Record[];

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
    const totalCrpNeeded = 180;
    return totalCrpNeeded - this.sumCrp;
  }

  get averageGrade(): number {
    let totalGrade = 0;
    let totalModules = 0;

    if (this._records.length === 0) return 0;

    for (const record of this._records) {
      if (record.halfWeighted) {
        totalGrade += record.grade / 2;
        totalModules += 0.5;
      } else {
        totalGrade += record.grade;
        totalModules += 1;
      }
    }
    return Math.round(totalGrade / totalModules);
  }
  getStatisticsMessage(): string {
    return `
      Anzahl der Datensätze: ${this.recordCount}
      Anzahl der halbgewichteten Datensätze: ${this.hwCount}
      Summe der Leistungspunkte: ${this.sumCrp}
      Fehlende Leistungspunkte bis zum Abschluss: ${this.crpToEnd}
      Durchschnittsnote: ${this.averageGrade}
    `;
  }
}
