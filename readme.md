# Javascript Reuables

Welcome to my repository of reusable JavaScript modules! This collection is designed to help developers save time and streamline their projects by providing ready-to-use components. Hopefully, I will be adding new modules over time, so stay tuned for updates and enhancements.

## Table of Contents

The `TableOfContent` class represents a Table of Contents for a web page. This class can be used to dynamically generate a Table of Contents based on the headings within a specified root element. It is designed to be highly flexible, allowing multiple instances to be created for different sections of a page. Additionally, you can style the generated Table of Contents using your own CSS file.

**Constructor Parameters:**

- `headings` (string) [optional]: The string used by `querySelectorAll()` to select headings. Defaults to selecting all heading levels (`"h1, h2, h3, h4, h5, h6"`).

- `container` (HTMLElement) [optional]: The container that will hold the generated Table of Contents. Defaults to a new `div` element.

- `prefix` (string) [optional]: The container's id if a `div` is provided, otherwise defaults to `"toc"`.

- `rootElement` (HTMLElement) [optional]: The root element from which to gather headings. Defaults to the `document` object.

**Description:**

- This class can be used with or without parameters. If no parameters are provided, default values will be used, but it is recommended to specify at least the container element.

- Multiple instances of the `TableOfContent` class can be created and used on the same page, each with different configurations. For example, if you have a lot of headings or any elements with a `textContent` in separate containers, you could make use of this feature.

- To style the generated Table of Contents, create your own CSS file and use the provided CSS class names.

**Usage**

```javascript
import { TableOfContent } from "./path/to/TableOfContent.js";

// Example usage with parameters
const toc1 = new TableOfContent({
  headings: "h1, h2, h3",
  container: document.getElementById("toc-container-1"),
  prefix: "custom-toc-1",
  rootElement: document.getElementById("content-section-1"),
});
toc1.generateTOC();

// Example usage with default parameters
const toc2 = new TableOfContent();
toc2.generateTOC();

// Example usage with different configuration
const toc3 = new TableOfContent({
  headings: "h2, h3, h4",
  container: document.getElementById("toc-container-2"),
  prefix: "custom-toc-2",
  rootElement: document.getElementById("content-section-2"),
});
toc3.generateTOC();
```
