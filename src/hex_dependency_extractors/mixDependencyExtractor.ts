import { HexDependencyExtractor } from "./hexDependencyExtractor";

const DOC_TEXT_DEPENDENCIES_REGEXP = /\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(\w+),?.*\},?\n))+)\s*\]\s*end/gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;

export class MixDependencyExtractor extends HexDependencyExtractor {
  docTextDepsRegexp(): RegExp {
    return DOC_TEXT_DEPENDENCIES_REGEXP;
  }

  depName(): string {
    const cleanLine = this.line.trim();
    const matches = this.lineNameDepRegexp().exec(cleanLine);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[1];
  }

  lineNameDepRegexp(): RegExp {
    return LINE_NAME_DEPENDENCY_REGEXP;
  }
}
