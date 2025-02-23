export class TableOfContent {
  /***************************************************
     * Represents a Table of Contents for the page.
     * @constructor
     * @param {Object} options - The options for creating the Table of Contents.
     * @param {string} [options.headings="h1, h2, h3, h4, h5, h6"] - The string used by `querySelectorAll()` to select headings. Defaults to selecting all heading levels.
     * @param {HTMLElement} [options.container=document.createElement('div')] - The container that will hold the generated Table of Contents.
     * @param {string} [options.prefix=null] - The container's id if a div is provided otherwise, "toc".
     * @param {HTMLElement} [options.rootElement=document] - The root element from which to gather headings.
  ***************************************************/

  static instances = {}; // Static property to hold instances keyed by configuration
  #headings = [];        // Private field to store the headings

  constructor({
    headings = "h1, h2, h3, h4, h5, h6",
    container = document.createElement('div'),
    prefix,
    rootElement = document
  } = {}) {
    /** @variable {string} configKey - Ensures that only one element is present for one div, allowing users to use multiple Table Of Content with different divs. */
    const configKey = `${headings}-${container.id || "default"}-${prefix || "default"}-${rootElement.id || "default"}`;

    if (TableOfContent.instances[configKey]) {
      console.warn("Table Of Content instance already exists with the same identifiers!");
      return TableOfContent.instances[configKey];
    }

    this.headings = headings;
    this.container = container;
    this.prefix = prefix || this.container.id || "toc";
    this.rootElement = rootElement;

    TableOfContent.instances[configKey] = this;
  }

  #render() {
    if (!this.container.isConnected) {
      this.rootElement.body.insertAdjacentElement("afterbegin", this.container);
      this.container.id = this.prefix;
    }
    this.container.innerHTML = "";
    this.#headings = this.rootElement.querySelectorAll(this.headings);
  }

  #highestLevelHeading() {
    if (this.#headings.length === 0)
      return 0;
    const levels = Array.from(this.#headings).map(
      heading => Number(heading.tagName.substring(1))
    );
    return Math.min(...levels);
  }

  #createLiItem(textContent) {
    const li = document.createElement("li");
    li.className = `${this.prefix}-li`;
    li.textContent = textContent;
    return li;
  }

  #createList() {
    const ul = document.createElement("ul");
    ul.className = `${this.prefix}-ul`;
    return ul;
  }

  generateTOC() {
    this.#render();

    let current = {
      list: this.#createList(),
      level: this.#highestLevelHeading()
    };

    this.container.appendChild(current.list);

    for (const heading of this.#headings) {
      let level = Number(heading.tagName.substring(1));
      const newItem = this.#createLiItem(heading.textContent);

      if (level > current.level) {
        const subList = this.#createList();
        current.list.lastElementChild?.appendChild(subList);
        current.list = subList;
        current.level = level;
      } else if (level < current.level) {
        while (current.level > level) {
          current.list = current.list.parentElement.closest("ul");
          current.level--;
        }
      }

      current.list.appendChild(newItem);
    }
  }

  displaySelectors() {
    console.log(`#${this.prefix}    - Table of Contents Container\n` +
      `.${this.prefix}-ul - Table of Contents Unordered List\n` +
      `.${this.prefix}-li - Table of Contents List Item`);
  }
}