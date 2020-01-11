import * as vscode from "vscode";
import { extractDependency } from "../extractDependency";
import { HexPackage, Details } from "../hexPackage";
import { cache } from "../common";

export class AbstractProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position, this.gemRegexp());
    const documentText = document.getText();
    const line = document.lineAt(position.line).text.trim();

    const dependency = extractDependency(documentText, line);
    if (!dependency) {
      return;
    }

    const hexPackage = new HexPackage(dependency.name, dependency.requirements);

    await this.cacheIfUncached(hexPackage);
    const details = this.getCache(hexPackage);
    if (details === undefined) {
      // somehow the Hex API call failed
      // TODO: show error message in popup? and/or retry
      return;
    }

    const message = this.buildMessage(details);
    const link = new vscode.Hover(message, range);
    return link;
  }

  public buildMessage(info: Details): string {
    const str = `${info.name} (latest: ${info.latestVersion})\n\n${info.description}\n\n${info.htmlUrl}\n${info.docsHtmlUrl}`;

    return str;
  }

  public gemRegexp(): RegExp {
    return /foo bar/;
  }

  private async cacheIfUncached(hexPackage: HexPackage): Promise<void> {
    if (this.isAlreadyCached(hexPackage)) {
      return;
    }

    // don't cache undefined
    const details = await this.details(hexPackage);
    if (details === undefined) {
      return;
    }

    this.setCache(hexPackage, details);
  }

  private async details(hexPackage: HexPackage): Promise<Details | undefined> {
    return hexPackage.details();
  }

  private cacheKey(hexPackage: HexPackage): string {
    return hexPackage.name;
  }

  private getCache(hexPackage: HexPackage): Details | undefined {
    return <Details>cache.get(this.cacheKey(hexPackage));
  }

  private setCache(hexPackage: HexPackage, details: Details): void {
    cache.set(this.cacheKey(hexPackage), details);
  }

  private isAlreadyCached(hexPackage: HexPackage): boolean {
    return cache.has(this.cacheKey(hexPackage));
  }
}
