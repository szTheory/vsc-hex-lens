import { HexDependencyExtractor } from "./hexDependencyExtractor";
import { erlangjs } from "erlang-shen-js";

const DOC_TEXT_DEPENDENCIES_REGEXP = /{deps\,\s*\[[\s\n]*(?:\{(\w+)\,[\"\'].+[\"\']\}\}[\s\n]*\]\})+\./gm;
const LINE_NAME_DEPENDENCY_REGEXP = /(?:\{(\w+)\,[\"\'].+[\"\']\,\{\w+\,[\"\'].+[\"\']\,[\"\'].+[\"\']\}\,?)+/;
const LINE_VERSION_REGEXP = /(?:\{\w+\,[\"\'].+[\"\']\,\{\w+\,[\"\'].+[\"\']\,[\"\'](.+)[\"\']\}\,?)+/;

export class RebarDependencyExtractor extends HexDependencyExtractor {
  docTextDepsRegexp(): RegExp {
    return DOC_TEXT_DEPENDENCIES_REGEXP;
  }

  lineNameDepRegexp(): RegExp {
    return LINE_NAME_DEPENDENCY_REGEXP;
  }

  lineVersionDepRegexp(): RegExp {
    return LINE_VERSION_REGEXP;
  }

  depName(): string {
    return this.hoverWord;
  }
}
