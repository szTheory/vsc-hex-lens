import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { versionFromLine, depNameFromLine } from '../../extractDependency';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('extractDependency test started...');

  test('#depNameFromLine 2 digits', () => {
    assert.equal(depNameFromLine('{:phoenix_pubsub, "~> 1.1"},'), "phoenix_pubsub");
  });
  test('#depNameFromLine 3 digits', () => {
    assert.equal(depNameFromLine('{:html_sanitize_ex, "~> 1.3.0"}'), "html_sanitize_ex");
  });
  test('#depNameFromLine options', () => {
    assert.equal(depNameFromLine('{:phoenix_live_reload, "~> 1.2", only: :dev}'), "phoenix_live_reload");
  });

  test('#versionFromLine 2 digits', () => {
    assert.equal(versionFromLine('{:phoenix_pubsub, "~> 1.1"},'), "1.1");
  });
  test('#versionFromLine 3 digits', () => {
    assert.equal(versionFromLine('{:html_sanitize_ex, "~> 1.3.0"}'), "1.3.0");
  });
  test('#versionFromLine options', () => {
    assert.equal(versionFromLine('{:phoenix_live_reload, "~> 1.2", only: :dev}'), "1.2");
  });
});
