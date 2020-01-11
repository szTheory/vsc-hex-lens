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

    const details = await this.getDetails(hexPackage);
    if (details === null) {
      // somehow the Hex API call failed
      // TODO: show error message in popup? and/or retry
      return;
    }

    const message = this.buildMessage(details);
    const link = new vscode.Hover(message, range);
    return link;
  }

  public buildMessage(info: Details): string {
    const str = `${info.name} (latest: ${info.latestVersion})\n\n${info.description}\n\n${info.htmlUrl}`;

    return str;
  }

  public gemRegexp(): RegExp {
    return /foo bar/;
  }

  private async getDetails(hexPackage: HexPackage): Promise<Details | null> {
    return await hexPackage.details();
  }
}
