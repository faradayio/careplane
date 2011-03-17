= Careplane

== Drivers

I'll flesh out this documentation later, but for now here are some notes on things that drivers need to do:

* Provide a `name` property (e.g. `'Kayak'`).
* Provide `searchPattern` property to determine which URLs are flight-result pages. This gets passed to String#search, so it can be a String or a Regexp.
* Provide an `insertAttribution` function. Ideally this will do two things: 1) Insert the `Careplane.standardTextAttribution` text somewhere in the page's footer and 2) call `Careplane.insertBadge(parentElement, referenceElement, additionalStyleForTheBadge)` to put the standard CM1 badge in a prominent place.
* Provide a `scoreFlights` function that kicks off the whole scoring process. If you need to use AJAX to retrieve additional details on each flight, use `Careplane.fetch(url, callback, regexp)`. That last regexp is optional; if provided, it will search the responseText for the pattern and return the first result as the second parameter to the callback. Somewhere along the way your driver should be creating `new Flight(origin, destination, airline, aircraft)` for each of the flights. This way you can use `myFlight.emissionEstimate(callback, identifier, totalNumberOfSegmentsInThisFlight)` to get spawn a calculation process whose result gets passed to the specified callback. This callback should eventually use `Careplane.insertEmissionEstimate(footprintNumber, elementId, totalNumberOfSegmentsInThisFlight)` which will keep track of formatting and progress for you.
* Provide a `hideEmissionEstimates` function that hides all emission estimates on the page. (The button in the Firefox notification box gets bound to this.)

== New driver checklist

1. Make sure all the above requirements are met
2. Put your driver in `chrome/conent/drivers/drivername.js`
3. Load it in `chrome/content/ff-overlay.xul`
4. Add an option for it in `chrome/content/options.xul`
5. Name the option in `chrome/locale/en-US/options.dtd`
6. Enable it by default in `chrome/defaults/preferences/prefs.js`
