import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { MixDependencyExtractor } from "../../hex_dependency_extractors/mixDependencyExtractor";
// import * as myExtension from '../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("extractDependency test started...");

  test("#depNameFromLine 2 digits", () => {
    assert.equal(
      new MixDependencyExtractor().depNameFromLine(
        '{:phoenix_pubsub, "~> 1.2"},'
      ),
      "phoenix_pubsub"
    );
  });
  test("#depNameFromLine 3 digits", () => {
    assert.equal(
      new MixDependencyExtractor().depNameFromLine(
        '{:html_sanitize_ex, "~> 1.4.0"}'
      ),
      "html_sanitize_ex"
    );
  });
  test("#depNameFromLine options", () => {
    assert.equal(
      new MixDependencyExtractor().depNameFromLine(
        '{:phoenix_live_reload, "~> 1.3", only: :dev}'
      ),
      "phoenix_live_reload"
    );
  });

  test("#versionFromLine 2 digits", () => {
    assert.equal(
      new MixDependencyExtractor().depVersionFromLine(
        '{:phoenix_pubsub, "~> 1.2"},'
      ),
      "1.2"
    );
  });
  test("#versionFromLine 3 digits", () => {
    assert.equal(
      new MixDependencyExtractor().depVersionFromLine(
        '{:html_sanitize_ex, "~> 1.4.0"}'
      ),
      "1.4.0"
    );
  });
  test("#versionFromLine options", () => {
    assert.equal(
      new MixDependencyExtractor().depVersionFromLine(
        '{:phoenix_live_reload, "~> 1.3", only: :dev}'
      ),
      "1.2"
    );
  });
});
