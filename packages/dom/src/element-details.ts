import { SourceReference } from "@virtualstate/fringe";
import { DocumentNode } from "./document-node";

export interface ElementDetails {
  rendered: Map<SourceReference, DocumentNode>;
  disconnect: Map<SourceReference, (documentNode: DocumentNode) => void | Promise<void>>;
}

export function createElementDetails(): ElementDetails {
  return {
    rendered: new Map<SourceReference, DocumentNode>(),
    disconnect: new Map<SourceReference, (documentNode: DocumentNode) => (void | Promise<void>)>()
  };
}

export function assertElementDetails(details: unknown): asserts details is ElementDetails {
  if (!isElementDetails(details)) {
    throw new Error("Expected ElementDetails");
  }
}

export function isElementDetails(details: unknown): details is ElementDetails {
  function isElementDetailsLike(details: unknown): details is { rendered: unknown, disconnect: unknown } {
    return !!details;
  }
  return isElementDetailsLike(details) && details.rendered instanceof Map && details.disconnect instanceof Map;
}
