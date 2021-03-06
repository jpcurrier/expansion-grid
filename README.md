# Expansion Grid

A responsive grid layout with drop-down expansion content.

Support: Chrome, Firefox, Safari, IE9+. Browsers that do not support CSS3 drop transition effects but retain basic responsive grid and content expansion functionality.

## Setup

Include the Expansion Grid stylesheet and script.

```html
<!-- Expansion Grid Stylesheet -->
<link rel="stylesheet" href="expansion-grid/expansion-grid.css">

<!-- Expansion Grid Script -->
<script src="expansion-grid/expansion-grid.js"></script>
```

A list structure is used for the grid, with the parent `ul` (or `ol`) element taking the class `expansion-grid`. Inside of each grid/list item, include an element with the class `expansion-grid-switch` to reveal expansion content when clicked, and an element with the class `expansion-grid-reveal` to contain whatever content belongs in the expansion.

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

Initialize the plugin on the `expansion-grid` container.

```javascript
// jQuery (1.7+) with default settings
$( '.expansion-grid' ).expansionGrid();

// jQuery (1.7+) with custom settings
$( '.expansion-grid' ).expansionGrid({
  position: true,
  positionOffset: -6
});

// vanilla JavaScript with default settings
var expansionGrid = new ExpansionGrid( '.expansion-grid' );

// vanilla JavaScript with custom settings
var expansionGrid = new ExpansionGrid(
  '.expansion-grid',
  {
    position: true,
    positionOffset: -6
  }
);
```

## Settings

Setting | Type | Default | Description
--- | --- | --- | ---
position | boolean | false | When a user opens expansion content, automatically scroll to the top of the expanded item. Note: fixed elements at the top of the window are not automatically offset, but can be accounted for with the `positionOffset` setting if their height is static.
positionOffset | integer | 0 | Number of pixels to offset window position from the top of the expanded item upon automatic positioning.