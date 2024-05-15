export class Record {
  id: number | null;
  moduleNr: string;
  moduleName: string;
  crp: number;
  grade: number;
  halfWeighted: boolean;
  summerTerm: boolean;
  year: number;

  constructor(id: number | null = null, moduleNr?: string, moduleName?: string, crp?: number, grade?: number, halfWeighted?: boolean, summerTerm?: boolean, year?: number) {
    this.id = id;
    this.moduleNr = moduleNr??"";
    this.moduleName = moduleName??"";
    this.crp = crp??0;
    this.grade = grade??0;
    this.halfWeighted = halfWeighted??false;
    this.summerTerm = summerTerm??false;
    this.year = year??2024;
  }
}
