class Parts {
  constructor(private parts: Array<string | number>) {}

  static createFromString(path: string) {
    if (path) {
      return new Parts(path.split("."));
    } else {
      return new Parts([]);
    }
  }

  static fromYupPath(path: string) {
    const parts = [];

    for (const part of path.split(".")) {
      const isIndexEl = part.includes("[") && part.includes("]");

      if (isIndexEl) {
        parts.push(part.slice(0, part.indexOf("[")));
        parts.push(part.slice(part.indexOf("[") + 1, part.indexOf("]")));
      } else {
        parts.push(part);
      }
    }

    return new Parts(parts);
  }

  public first() {
    return this.parts.at(0);
  }

  public slice(idx: number) {
    return Parts.createFromString(this.parts.slice(idx).join("."));
  }

  public isEmpty() {
    return this.parts.length === 0;
  }

  public toStr() {
    return this.parts.join(".");
  }
}

export default Parts;
