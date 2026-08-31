export default class SplitType {
  elements: HTMLElement[];
  chars?: HTMLElement[];
  words?: HTMLElement[];
  lines?: HTMLElement[];

  constructor(target: HTMLElement | string | NodeListOf<HTMLElement>, options: { types?: string } = {}) {
    let elements: HTMLElement[] = [];
    if (typeof target === "string") {
      elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof HTMLElement) {
      elements = [target];
    } else if (target) {
      elements = Array.from(target as unknown as HTMLElement[]);
    }
    this.elements = elements;

    const types = (options.types || "chars,words,lines").split(",").map((s) => s.trim());
    const splitChars = types.includes("chars");
    const splitLines = types.includes("lines");
    const splitWords = types.includes("words");

    const allChars: HTMLElement[] = [];
    const allWords: HTMLElement[] = [];
    const allLines: HTMLElement[] = [];

    elements.forEach((el) => {
      const text = el.textContent || "";
      el.innerHTML = "";

      if (splitChars) {
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.display = "inline-block";
          el.appendChild(span);
          allChars.push(span);
        });
      } else if (splitLines || splitWords) {
        const words = text.split(/\s+/).filter(Boolean);
        words.forEach((word, wIdx) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "word line";
          wordSpan.textContent = word;
          wordSpan.style.display = "inline-block";
          wordSpan.style.marginRight = wIdx < words.length - 1 ? "0.28em" : "0";
          el.appendChild(wordSpan);
          allWords.push(wordSpan);
          allLines.push(wordSpan);
        });
      }
    });

    if (splitChars) this.chars = allChars;
    if (splitWords) this.words = allWords;
    if (splitLines) this.lines = allLines;
  }

  revert() {
    this.elements.forEach((el) => {
      el.textContent = el.textContent || "";
    });
  }
}
