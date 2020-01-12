import { HexDependency } from "../hexDependency";

export abstract class HexDependencyExtractor {
  abstract depName(): string;
  abstract docTextDepsRegexp(): RegExp;
  abstract lineNameDepRegexp(): RegExp;

  protected documentText: string;
  protected line: string;
  protected hoverWord: string;

  constructor(documentText: string, line: string, hoverWord: string) {
    this.documentText = documentText;
    this.line = line;
    this.hoverWord = hoverWord;
  }

  extractHexDependency(): HexDependency | null {
    if (!this.isDependency()) {
      return null;
    }

    const name = this.depName();

    return { name: name } as HexDependency;
  }

  depsText(): string {
    const matches = this.docTextDepsRegexp().exec(this.documentText);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[0];
  }

  isDependency(): boolean {
    const depsText = this.depsText();
    const cleanLine = this.line.trim();
    if (depsText.trim() === "") {
      return false;
    }

    return depsText.includes(cleanLine) && this.depName().trim() !== "";
  }
}
