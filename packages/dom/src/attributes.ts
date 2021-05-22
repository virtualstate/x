import { isNativeAttributesObject, NativeOptionsVNode } from "./options";

export function setAttributes(node: NativeOptionsVNode, documentNode: Element) {
  const attributes = node.options.attributes;

  if (!isNativeAttributesObject(attributes)) {
    return;
  }

  const keys = Object.keys(attributes);

  const lowerKeys = keys.map(key => key.toLowerCase());

  const duplicates = lowerKeys.filter(
    (value, index, array) => {
      const before = array.slice(0, index);
      return before.includes(value);
    }
  );

  if (duplicates.length) {
    throw new Error(`Duplicate keys found for ${duplicates.join(", ")}, this will lead to unexpected behaviour, and is not supported`);
  }

  const toRemove = [];

  // Don't use lower keys here as we need to access attributes
  keys.forEach(key => {
    const value = attributes[key];
    if (value === undefined || value === false) {
      toRemove.push(key);
    } else if (value === true) {
      documentNode.setAttribute(key, "");
    } else {
      documentNode.setAttribute(key, String(attributes[key]));
    }
  });

  const attributesLength = documentNode.attributes.length;

  // Assume we set all of these attributes, and don't need to check further if there
  if (attributesLength === keys.length && toRemove.length === 0) {
    return;
  }

  for (let attributeIndex = 0; attributeIndex < attributesLength; attributeIndex += 1) {
    const attribute = documentNode.attributes.item(attributeIndex);
    if (lowerKeys.includes(attribute.name.toLowerCase())) {
      continue;
    }
    toRemove.push(attribute.name);
  }

  toRemove.forEach(key => documentNode.removeAttribute(key));
}
