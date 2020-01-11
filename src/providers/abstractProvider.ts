import * as vscode from "vscode";
import { HexPackage, Details } from "../hexPackage";
import { RebarDependencyExtractor } from "../hex_dependency_extractors/rebarDependencyExtractor";
import { MixDependencyExtractor } from "../hex_dependency_extractors/mixDependencyExtractor";

export class AbstractProvider implements vscode.HoverProvider {
  public async provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Hover | undefined> {
    const range = document.getWordRangeAtPosition(position);
    const documentText = document.getText();
    const line = document.lineAt(position.line).text.trim();

    let extractor = null;
    if (document.languageId === "erlang") {
      extractor = new RebarDependencyExtractor();
    } else if (document.languageId === "elixir") {
      extractor = new MixDependencyExtractor();
    }

    const hexDependency = extractor
      ? extractor.extractHexDependency(documentText, line)
      : null;

    if (!hexDependency) {
      return;
    }

    const hexPackage = new HexPackage(
      hexDependency.name,
      hexDependency.requirements
    );

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

  private async getDetails(hexPackage: HexPackage): Promise<Details | null> {
    return await hexPackage.details();
  }
}
