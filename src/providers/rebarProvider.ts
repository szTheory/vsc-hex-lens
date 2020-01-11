import { AbstractProvider } from "./abstractProvider";

export class RebarProvider extends AbstractProvider {
  public hexRegexp(): RegExp {
    console.log("REBAR REGEX");
    return /\w+\.(add_development_dependency|add_runtime_dependency|add_dependency)/;
  }
}
