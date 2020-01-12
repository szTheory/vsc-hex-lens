import { HexDependencyExtractor } from "./hexDependencyExtractor";

const DOC_TEXT_DEPENDENCIES_REGEXP = /{deps\,\s*\[[\s\n]*(?:\{(\w+)\,[\"\'].+[\"\']\}\}[\s\n]*\]\})+\./gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{\s*\w+\,/;

export class RebarDependencyExtractor extends HexDependencyExtractor {
  docTextDepsRegexp(): RegExp {
    return DOC_TEXT_DEPENDENCIES_REGEXP;
  }

  lineNameDepRegexp(): RegExp {
    return LINE_NAME_DEPENDENCY_REGEXP;
  }

  depName(): string {
    return this.hoverWord;
  }
}
