import { HexDependencyExtractor } from "./hexDependencyExtractor";

const DOC_TEXT_DEPENDENCIES_REGEXP = /{deps\,\s*\[[\s\n]*(?:\{(\w+)\,[\"\'].+[\"\']\}\}[\s\n]*\]\})+\./gm;
const LINE_NAME_DEPENDENCY_REGEXP = /(?:\{(\w+)\,[\"\'].+[\"\']\,\{\w+\,[\"\'].+[\"\']\,[\"\'].+[\"\']\}\,?)+/;
const LINE_VERSION_REGEXP = /(?:\{\w+\,[\"\'].+[\"\']\,\{\w+\,[\"\'].+[\"\']\,[\"\'](.+)[\"\']\}\,?)+/;

export class RebarDependencyExtractor extends HexDependencyExtractor {
  constructor() {
    super(
      DOC_TEXT_DEPENDENCIES_REGEXP,
      LINE_NAME_DEPENDENCY_REGEXP,
      LINE_VERSION_REGEXP
    );
  }
}
