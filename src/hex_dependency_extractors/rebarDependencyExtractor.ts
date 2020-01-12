import { HexDependencyExtractor } from "./hexDependencyExtractor";

export class RebarDependencyExtractor extends HexDependencyExtractor {
  docTextDepsRegexp(): RegExp {
    return /(deps\,[^\[\]]+\[[^\[\]]+\])/gm;
  }

  lineNameDepRegexp(): RegExp {
    return /\{\s*\w+\,/;
  }

  depName(): string {
    return this.hoverWord;
  }
}
