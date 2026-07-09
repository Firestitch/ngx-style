export interface Token {
  name: string;
  value: string;
}

/**
 * Reads the `--fs-token-*` custom properties that the playground republishes from the library's
 * Sass variables, so the token gallery shows the values this app actually compiled rather than a
 * hand-copied list that would rot.
 */
export function readTokens(doc: Document, prefix: string): Token[] {
  const tokens = new Map<string, string>();

  Array.from(doc.styleSheets).forEach((sheet) => {
    let rules: CSSRuleList;

    try {
      // Cross-origin sheets throw on access and hold nothing of ours.
      rules = (sheet as CSSStyleSheet).cssRules;
    } catch {
      return;
    }

    Array.from(rules || []).forEach((rule: CSSRule) => {
      const style = (rule as CSSStyleRule).style;

      if ((rule as CSSStyleRule).selectorText !== ':root' || !style) {
        return;
      }

      for (let i = 0; i < style.length; i++) {
        const property = style[i];

        if (property.startsWith(prefix)) {
          tokens.set(property, style.getPropertyValue(property).trim());
        }
      }
    });
  });

  return Array.from(tokens, ([name, value]) => ({ name, value }));
}
