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
    if (!cache.has(hexPackage.name)) {
      const details = await hexPackage.details();
      if (details !== undefined) {
        cache.set(hexPackage.name, details);
      }
    }
    const details = cache.get(hexPackage.name);
    if (details === undefined) {
      return;
    }

    const message = this.buildMessage(details);
    const link = new vscode.Hover(message, range);
    return link;
  }

  public buildMessage(info: Details): string {
    console.log("---- buildMessage");
    return `${info.info}\n\nLatest version: ${info.version}\n\n${info.homepage_uri}`;
  }

  public gemRegexp(): RegExp {
    console.log("ABSTRACT---");
    return /foo bar/;
  }
}
