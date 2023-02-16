import * as dat from "lil-gui";

export default interface Controllers {
  [key: string]: {
    controller: dat.Controller;
    type: string;
    min?: number;
    max?: number;
    items?: Array<string>;
  };
}
