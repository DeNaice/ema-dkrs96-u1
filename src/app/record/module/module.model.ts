export class Module {

  moduleNr: string
  moduleName: string
  moduleCrp: number


  constructor(moduleNr: string, moduleName: string, moduleCrp: number) {
    this.moduleNr = moduleNr
    this.moduleName = moduleName
    this.moduleCrp = moduleCrp
  }
}
