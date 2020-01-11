import { HexDependencyExtractor } from "./hexDependencyExtractor";

const DOC_TEXT_DEPENDENCIES_REGEXP = /\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(\w+),?.*\},?\n))+)\s*\]\s*end/gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;
const LINE_VERSION_REGEXP = /[\"\'].+\s+([\d\.]*\d)[\"\'].+/;

export class MixDependencyExtractor extends HexDependencyExtractor {
  docTextDepsRegexp(): RegExp {
    return DOC_TEXT_DEPENDENCIES_REGEXP;
  }

  lineNameDepRegexp(): RegExp {
    return LINE_NAME_DEPENDENCY_REGEXP;
  }

  lineVersionDepRegexp(): RegExp {
    return LINE_VERSION_REGEXP;
  }
}
