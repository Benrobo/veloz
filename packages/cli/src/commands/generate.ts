import BaseSetup from "../utils/projectHelper/base.js";

class VelozGenerate extends BaseSetup {
  //   private projName: string;
  constructor() {
    super();
    // this.projName = projName;
  }
  async start(projName: string) {
    // start project generation;

    // fetch project details (_id, name)
    console.log("starting project generation", projName);
  }
}

export default VelozGenerate;
