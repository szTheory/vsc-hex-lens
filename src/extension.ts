import * as vscode from "vscode";
import { RebarProvider } from "./providers/rebarProvider";
import { MixProvider } from "./providers/mixProvider";

export function activate(context: vscode.ExtensionContext): void {
	console.log("Hex lens extension activated");
	const rebarFile: vscode.DocumentFilter = {
		language: "erlang",
		pattern: "**/rebar.config",
		scheme: "file",
	};
	console.log(1);
	context.subscriptions.push(
		vscode.languages.registerHoverProvider(rebarFile, new RebarProvider())
	);

	console.log(2);
	const mixFile: vscode.DocumentFilter = {
		language: "elixir",
		pattern: "**/mix.exs",
		// pattern: "mix.exs",
		scheme: "file",
	};
	console.log(3);
	context.subscriptions.push(
		vscode.languages.registerHoverProvider(mixFile, new MixProvider())
	);
	console.log(4);
}

export function deactivate(): void {
	return;
}
