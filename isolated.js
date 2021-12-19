const TokenConstructorSymbol = Symbol.for("unknown1");
const TokenAncestor = Symbol.for("unknown1");
function defineProperties(token, options, ancestor) {
  const accessOnly = {
    enumerable: false,
    writable: false,
    configurable: true
  };
  Object.defineProperties(token, {
    options: {
      ...accessOnly,
      value: options,
      enumerable: !!options
    },
    [TokenConstructorSymbol]: {
      ...accessOnly,
      value: token,
    },
    ...options[TokenAncestor] && ancestor ? ({
      [TokenAncestor]: {
        writable: true,
        enumerable: true,
        configurable: true,
        value: ancestor
      }
    }) : undefined
  });
}
function Token() {}
defineProperties(Token, undefined, undefined);
defineProperties(Token, null, undefined);
defineProperties(Token, {}, undefined);
