import * as vscode from "vscode";
import { RebarProvider } from "./providers/rebarProvider";
import { MixProvider } from "./providers/mixProvider";

export function activate(context: vscode.ExtensionContext): void {
  console.log("Hex lens extension activated");
  subscribeHoverProviderRebar(context);
  subscribeHoverProviderMix(context);
}

export function deactivate(): void {
  return;
}

function subscribeHoverProviderRebar(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(REBAR_FILE, new RebarProvider())
  );
}

function subscribeHoverProviderMix(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(MIX_FILE, new MixProvider())
  );
}

const REBAR_FILE: vscode.DocumentFilter = {
  language: "erlang",
  pattern: "**/rebar.config",
  scheme: "file"
};

const MIX_FILE: vscode.DocumentFilter = {
  language: "elixir",
  pattern: "**/mix.exs",
  scheme: "file"
};
