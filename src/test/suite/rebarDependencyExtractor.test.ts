// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as assert from "assert";
import { RebarDependencyExtractor } from "../../hex_dependency_extractors/rebarDependencyExtractor";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("extractDependency test started...");

  const docText = `
  {deps, [
    {rebar3_hex,".*",{git,"https://github.com/ninenines/cowlib","2.8.0"}},{ranch,".*",{git,"https://github.com/ninenines/ranch","1.7.1"}}
  ]}.
  {erl_opts, [debug_info,warn_export_vars,warn_shadow_vars,warn_obsolete_guard,warn_missing_spec,warn_untyped_record]}.
  `;

  test("#depName multiple hover first", () => {
    assert.equal(
      new RebarDependencyExtractor(
        docText,
        '{rebar3_hex,".*",{git,"https://github.com/ninenines/cowlib","2.8.0"}},{ranch,".*",{git,"https://github.com/ninenines/ranch","1.7.1"}}',
        "rebar3_hex"
      ).depName(),
      "rebar3_hex"
    );
  });

  test("#depName multiple hover second", () => {
    assert.equal(
      new RebarDependencyExtractor(
        docText,
        '{rebar3_hex,".*",{git,"https://github.com/ninenines/cowlib","2.8.0"}},{ranch,".*",{git,"https://github.com/ninenines/ranch","1.7.1"}}',
        "ranch"
      ).depName(),
      "ranch"
    );
  });

  const formattedDocText = `
  {
    deps,
    [
        {cowlib, ".*", {git, "https://github.com/ninenines/cowlib", "2.8.0"}},
        {ranch, ".*", {git, "https://github.com/ninenines/ranch", "1.7.1"}}
    ]
}.

{
    erl_opts,
    [
        debug_info,
        warn_export_vars,
        warn_shadow_vars,
        warn_obsolete_guard,
        warn_missing_spec,
        warn_untyped_record
    ]
}.
  `;

  test("#depName multiple hover second", () => {
    assert.equal(
      new RebarDependencyExtractor(
        formattedDocText,
        '{cowlib, ".*", {git, "https://github.com/ninenines/cowlib", "2.8.0"}}',
        "cowlib"
      ).depName(),
      "cowlib"
    );
  });

  test("#depName multiple hover second", () => {
    assert.equal(
      new RebarDependencyExtractor(
        formattedDocText,
        '{ranch, ".*", {git, "https://github.com/ninenines/ranch", "1.7.1"}}',
        "ranch"
      ).depName(),
      "ranch"
    );
  });
});
