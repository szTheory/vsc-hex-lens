import { Hash } from "crypto";

interface Dependency {
  name: string;
  requirements: string | undefined;
}

// function quoteMapper(line: string): string {
//   const quoteIndex = line.indexOf("'");
//   const start = quoteIndex >= 0 ? quoteIndex : line.indexOf('"') || 0;
//   return line.slice(start);
// }

const DOC_TEXT_DEPENDENCIES_REGEXP = /\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(\w+),?.*\},?\n))+)\s*\]\s*end/gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;
// const LINE_VERSION_REGEXP = /\{:\w+,\s+(?:[\"\'](.*\d+.*)[\"\'])?.*\}/gm;
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

  // const mapped = quoteMapper(line);
  // const parts = mapped
  //   .trim()
  //   .split(",")
  //   .map(s => s.trim().replace(/'|"/g, ""));

  // if (parts.length >= 1) {
  //   const name = parts[0];
  //   const requirements = parts[1];
  //   return { name: name, requirements: requirements };
  // }

  // return undefined;
  const name = depNameFromLine(line);
  const requirements = versionFromLine(line);

  return { name: name, requirements: requirements };
}
