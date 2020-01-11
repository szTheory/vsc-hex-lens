import { HexDependencyExtractor } from "./hexDependencyExtractor";

const DOC_TEXT_DEPENDENCIES_REGEXP = /\s*defp deps do\s*\[(?:(?:\s*(?:\#.+|\{:(\w+),?.*\},?\n))+)\s*\]\s*end/gm;
const LINE_NAME_DEPENDENCY_REGEXP = /\{:(\w+),?.*\}/;
const LINE_VERSION_REGEXP = /[\"\'].+\s+([\d\.]*\d)[\"\'].+/;

export class MixDependencyExtractor extends HexDependencyExtractor {
  constructor() {
    super(
      DOC_TEXT_DEPENDENCIES_REGEXP,
      LINE_NAME_DEPENDENCY_REGEXP,
      LINE_VERSION_REGEXP
    );
  }
}
