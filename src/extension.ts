import * as vscode from "vscode";
import { RebarProvider } from "./providers/rebarProvider";
import { MixProvider } from "./providers/mixProvider";

export function activate(context: vscode.ExtensionContext): void {
  console.log("Hex lens extension activated");
  const rebarFile: vscode.DocumentFilter = {
    language: "erlang",
    pattern: "**/rebar.config",
    scheme: "file"
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(rebarFile, new RebarProvider())
  );

  const mixFile: vscode.DocumentFilter = {
    language: "elixir",
    pattern: "**/mix.exs",
    // pattern: "mix.exs",
    scheme: "file"
  };
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(mixFile, new MixProvider())
  );
}

export function deactivate(): void {
  return;
}
