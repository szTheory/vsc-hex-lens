import { HexDependency } from "../hexDependency";

export abstract class HexDependencyExtractor {
  docDepsTextRegexp: RegExp;
  lineDepNameRegexp: RegExp;
  lineDepVersionRegexp: RegExp;

  constructor(
    docTextDepsSectionRegexp: RegExp,
    lineDepNameRegexp: RegExp,
    lineDepVersionRegexp: RegExp
  ) {
    this.docDepsTextRegexp = docTextDepsSectionRegexp;
    this.lineDepNameRegexp = lineDepNameRegexp;
    this.lineDepVersionRegexp = lineDepVersionRegexp;
  }

  extractHexDependency(
    documentText: string,
    line: string
  ): HexDependency | null {
    if (!this.isDependency(documentText, line)) {
      return null;
    }

    const name = this.depNameFromLine(line);
    const requirements = this.depVersionFromLine(line);

    return { name: name, requirements: requirements } as HexDependency;
  }

  depNameFromLine(line: string): string {
    const cleanLine = line.trim();
    const matches = this.lineDepNameRegexp.exec(cleanLine);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[1];
  }

  depVersionFromLine(line: string): string {
    const matches = this.lineDepVersionRegexp.exec(line);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[1];
  }

  depsText(docText: string): string {
    const matches = this.docDepsTextRegexp.exec(docText);
    if (matches === null || matches.length === 1) {
      return "";
    }

    return matches[0];
  }

  isDependency(documentText: string, line: string): boolean {
    const depsText = this.depsText(documentText);
    const cleanLine = line.trim();
    if (depsText.trim() === "") {
      return false;
    }

    return (
      depsText.includes(cleanLine) &&
      this.depNameFromLine(cleanLine).trim() !== ""
    );
  }
}
