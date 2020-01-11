import { AbstractProvider } from "./abstractProvider";

export class MixProvider extends AbstractProvider {
  public hexRegexp(): RegExp {
    console.log("hexRegexp MIX!!!");
    return /\bgem( |"|')/;
  }
}
