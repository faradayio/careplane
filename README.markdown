# Careplane

## Drivers

There are currently two drivers, Kayak and Orbitz. The Kayak driver is a good reference for JavaScript-heavy sites that update results without reloading the page. Orbitz is a text-book example of a pre-Web 2.0 travel site.

Driver checklist:

* Instantiated with a single argument, a pointer to the page's top-level document object.
* Prototype inherits from the Driver object, which provides `#hideEmissionEstimates()`.
* Provides a `.driverName` property (e.g. `'Kayak'`).
* Provides a `#shouldMonitor` function which takes a URL and determines if the URL represents a page that the driver should score flights on.
* Provides an `insertAttribution` function. Ideally this will do two things: 1) Insert the `Careplane.standardTextAttribution` text somewhere in the page's footer and 2) call `Careplane.insertBadge(parentElement, referenceElement, additionalStyleForTheBadge)` to put the standard CM1 badge in a prominent place.
* Provides a `#load` function that kicks off the whole scoring process. Typical tasks within this function are to call `Careplane.notify()`, `insertAttribution()`, and a method that starts scoring flights. If you're writing a driver for an AJAX-heavy site, this method might start monitoring the page for certain elements to appear.
* Make sure your inserted footprint elements have class `careplane-footprint` so that the "Hide footprints" button hides them.

## New driver checklist

1. Make sure all the above requirements are met
2. Put your driver in `chrome/conent/drivers/DriverName.js`
3. Load it in `chrome/content/ff-overlay.xul`
4. Add an option for it in `chrome/content/options.xul`
5. Name the option in `chrome/locale/en-US/options.dtd`
6. Enable it by default in `chrome/defaults/preferences/prefs.js`
