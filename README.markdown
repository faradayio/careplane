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

## Versioning and releasing

There are a few rake tasks for setting the plugin's current version that also tag the latest commit with the current version:
* `rake version` displays the current version
* `rake version:set[1.2.3]` will force a version
* `rake version:bump` and `rake version:bump:patch` will bump the patch version, e.g., 0.2.3 => 0.2.4
* `rake version:minor` will bump the minor version, e.g., 0.2.3 => 0.3.0
* `rake version:major` will bump the major version, e.g., 0.2.3 => 1.0.0

The `rake changelog` task will create a changelog entry for the latest version. The entry is included in the gh-pages atom feed for each browser (pages/safari.xml, etc.). You can either set the changelog message on the command line with `rake changelog[new stuff]` or if no parameter is given, it will prompt you to fill in a message with your favorite editor (e.g., vi).

The `rake release` task runs the `changelog` task, then packages each plugin and copies it to the pages/downloads folder.
