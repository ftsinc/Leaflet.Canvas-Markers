# Leaflet.Canvas-Markers
Leaflet plugin for displaying markers on canvas instead of DOM. Working with Leaflet 1.0.0 and above.
Feel free to contribute.

This fork contains a fix for zoom animations, which came from a branch of Oleg Podchashynskyi's (corg) fork
https://github.com/corg/Leaflet.Canvas-Markers
In addition, it adds a setEnforceZIndex() function that can be used to support maintaining the marker zIndexOffset
during rendering.
As the markers returned by the Rbush search results were not being sorted by zIndexOffset.

## Demo

There's a [demo](http://eJuke.github.io/Leaflet.Canvas-Markers/examples/index.html) for 10000 points, running on Canvas

## Installation and basic usage

Just download `leaflet.canvas-markers.js` from the `dist` folder and attach it to your project.

```html
<script src="leaflet.canvas-markers.js"></script>
```

Now attach layer to map and some markers.

```js
// Adds a layer
var ciLayer = L.canvasIconLayer({}).addTo(map);

// Marker definition
var marker =  L.marker([58.5578, 29.0087], {icon: icon});

// Adding marker to layer
ciLayer.addMarker(marker);

// Ensure zIndexOffset is respected during rendering.
ciLayer.setEnforceZIndex(true);
```

## Benchmark

Plugin was tested in Google Chrome v66 & IE11. There is results for 100000 markers:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Default Leaflet Markers</th>
      <th><b>Leaflet.Canvas-Markers</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Memory used</td>
      <td>up to 2.8 Gb</td>
      <td><b>about 300 Mb</b></td>
    </tr>
    <tr>
      <td>First load time</td>
      <td>160-200 seconds</td>
      <td><b><1 seconds</b></td>
    </tr>
    <tr>
      <td>Zoom and move time</td>
      <td>more than 3 minutes</td>
      <td><b>0.5 seconds</b></td>
    </tr>
  </tbody>
</table>

As you can see DOM operations are slow, so you should use canvas for a large number of markers.

You can also use L.circleMarker for your points with similar performance, but then you're limited to icon design.

## Methods

- **addMarker(marker)**: Adds a marker to the layer.
- **addMarkers(markers)**: Adds a markers to the layer.
- **removeMarker(marker, redraw)**: Removes a marker from the layer. Set **redraw** to `true` if you want to redraw layer after marker remove
- **redraw()**: Redraws the layer
- **addOnClickListener(eventHandler)**: Adds common click listener for all markers
- **addOnHoverListener(eventHandler)**: Adds a hover over listener for all markers
- **setEnforceZIndex(enforce)**: Markers will be rendered maintaining their zIndexOffset ordering.
- **initializeCanvas**: Sets the size and position of the canvas. Required to ensure all markers are rendered at
 the correct location if the map will be immediately moved/zoomed programmatically, or is manually moved before the
 first canvas redraw() occurs.

I also implemented binds for default **addLayer**, **addLayers** and **removeLayer** (equal to removeMarker(marker, _true_) methods.

## Contributors

[crzo](https://github.com/crzo), [Spaction](https://github.com/Spaction)
