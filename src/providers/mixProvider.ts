import { AbstractProvider } from "./abstractProvider";

export class MixProvider extends AbstractProvider {
  public hexRegexp(): RegExp {
    return /\bgem( |"|')/;
  }
}
