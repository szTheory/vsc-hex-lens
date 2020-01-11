import { HexDependency } from "../hexDependency";

export abstract class HexDependencyExtractor {
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
    const requirements = this.depVersion();

    return { name: name, requirements: requirements } as HexDependency;
  }

  depName(): string {
    const cleanLine = this.line.trim();
    const matches = this.lineNameDepRegexp().exec(cleanLine);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[1];
  }

  depVersion(): string {
    const matches = this.lineVersionDepRegexp().exec(this.line);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[1];
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

  abstract docTextDepsRegexp(): RegExp;

  abstract lineNameDepRegexp(): RegExp;

  abstract lineVersionDepRegexp(): RegExp;
}
