export const hmm = {
  "👀"<No>(): No {
    return hmm["😢"]() as No;
  },
  "😢"(): unknown {
    return new Proxy({}, {
      get() {
        return undefined;
      }
    });
  },
  "🕵️"<Huh>(): Huh {
    return this["👀"]()
  }
}
