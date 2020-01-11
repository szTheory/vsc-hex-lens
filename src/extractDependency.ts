import { Hash } from "crypto";

interface Dependency {
  name: string;
  requirements: string | undefined;
}

const DOC_TEXT_DEPENDENCIES_REGEXP = /\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(\w+),?.*\},?\n))+)\s*\]\s*end/gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;
const LINE_VERSION_REGEXP = /[\"\'].+\s+([\d\.]*\d)[\"\'].+/;

export function depNameFromLine(line: string) {
  const cleanLine = line.trim();
  const matches = LINE_NAME_DEPENDENCY_REGEXP.exec(cleanLine);
  if (matches === null || matches.length === 1) {
    return "";
  }

  return matches[1];
}

export function versionFromLine(line: string): string {
  const matches = LINE_VERSION_REGEXP.exec(line);
  if (matches === null || matches.length === 1) {
    return "";
  }

  return matches[1];
}

function dependenciesText(docText: string): string {
  const matches = DOC_TEXT_DEPENDENCIES_REGEXP.exec(docText);
  if (matches === null || matches.length === 1) {
    return "";
  }

  return matches[0];
}

function isDependency(documentText: string, line: string): boolean {
  const depsText = dependenciesText(documentText);
  const cleanLine = line.trim();
  if (depsText.trim() === "") {
    return false;
  }

  return depsText.includes(cleanLine) && depNameFromLine(cleanLine).trim() !== "";
}

export function extractDependency(documentText: string, line: string): Dependency | undefined {
  if (!isDependency(documentText, line)) {
    return undefined;
  }

  const name = depNameFromLine(line);
  const requirements = versionFromLine(line);

  return { name: name, requirements: requirements };
}
