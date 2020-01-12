import { HexDependencyExtractor } from "./hexDependencyExtractor";

export class MixDependencyExtractor extends HexDependencyExtractor {
  depName(): string {
    const cleanLine = this.line.trim();
    const matches = this.lineNameDepRegexp().exec(cleanLine);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[1];
  }

  docTextDepsRegexp(): RegExp {
    return /(\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(?:\w+),?.*\},?\n))+)\s*\]\s*end)/gm;
  }

  lineNameDepRegexp(): RegExp {
    return /\{:(\w+),?.*\}/;
  }
}
