export const hmm = {
  "👀"<No>(value?: unknown): No {
    return (value ?? hmm["😢"]()) as No;
  },
  "😢"(): unknown {
    return {};
  },
  "🕵️"<Huh>(): Huh {
    return this["👀"]()
  }
}
