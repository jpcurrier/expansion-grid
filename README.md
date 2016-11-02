# Expansion Grid

A responsive grid layout with drop-down expansion content. Requires jQuery 1.7+.

Tested support: Chrome, Firefox, Safari. Older browsers that do not support CSS3 drop transition effects but retain basic responsive grid and content expansion functionality.

## Setup

Include jQuery (1.7+) and the Expansion Grid plugin files.

```html
<!-- Expansion Grid Stylesheet -->
<link rel="stylesheet" href="expansion-grid/expansion-grid.css">

<!-- Simple Slide-Show jQuery Plugin -->
<script src="expansion-grid/expansion-grid.js"></script>
```

A list structure is used for the grid, with the parent `ul` (or `ol`) element taking the class `expansion-grid`. Inside of each list (grid) item, include an element with the class `expansion-grid-switch` to reveal expansion content when clicked, and an element with the class `expansion-grid-reveal` to contain whatever content belongs in the expansion.

Any kind of HTML content can be included inside the "switch" and "reveal" elements.

```html
<ul class="expansion-grid">
  <li>
    <button class="expansion-grid-switch">
      <p>Persistent content for item 1.</p>
    </button>
    <div class="expansion-grid-reveal">
      <p>Expansion content for item 1.</p>
    </div>
  </li>
  <li>
    <button class="expansion-grid-switch">
      <p>Persistent content for item 2.</p>
    </button>
    <div class="expansion-grid-reveal">
      <p>Expansion content for item 2.</p>
    </div>
  </li>
</ul>
```

Call the plugin on the `expansion-grid` element with jQuery.

```javascript
// simple
$( '.expansion-grid' ).expansionGrid();

// custom settings
$( '.expansion-grid' ).expansionGrid({
  position: true,
  positionOffset: -6
});
```

## Settings

Setting | Type | Default | Description
--- | --- | --- | ---
position | boolean | false | When a user opens expansion content, automatically scroll window to line its top up with the top of the expanded item.
positionOffset | integer | 0 | Number of pixels to offset window position from the top of the expanded item upon automatic scroll.