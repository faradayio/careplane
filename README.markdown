# Careplane

Careplane is a browser plug-in for Chrome, Safari, and Firefox that superimposes carbon footprints on flight search sites, including Kayak, Hipmunk, Orbitz, and Bing.

## Installation

See [the Careplane website](http://carplane.org).

## Development environment

* Install [node.js](http://nodejs.org)
* `npm install -g vows`
* `npm install`
* `gem install bundler`
* `bundle install`

### Safari build tools

Get latest documents1 repo, either put it in ~/documents1 or make a link to it at ~/documents1.

Install a patched version of xar, which is included in the careplane repo:

    tar -zxvf xar_232v3_src.tar.gz
    cd xar_232v3
    ./configure
    make
    sudo make install
    rm -f /usr/bin/xar

Note: the new xar is installed in /usr/local/bin/xar

### Cucumber system dependencies

The cucumber tests require Qt and WebKit. See instructions here: https://github.com/thoughtbot/capybara-webkit

## Drivers

There are currently five drivers, Kayak, KayakUK, Hipmunk, Bing, and Orbitz. The Kayak driver is a good reference for JavaScript-heavy sites that update results without reloading the page. Orbitz is a text-book example of a pre-Web 2.0 travel site. Bing is unique in that it hijacks the large JSON search request sent to a Kayak API. Hipmunk injects a script tag into the page that dumps Hipmunk's runtime data to JSON for the plugin to load into its JavaScript sandbox.

### Creating a new driver

You will need to implement several classes. A good example is to look under `lib/drivers/kayak.js` and `lib/drivers/kayak/*`. As an example, the classes you'll need for a search site called "Zombocom" are:

* `lib/drivers/zombo.js` defines `Zombo`, which:
  * Is instantiated with a single argument, the current extension object (e.g. GoogleChromeExtension)
  * Prototype inherits from the Driver object
  * Provides a `.driverName` property (e.g. `'Kayak'`).
  * Provides a `.monitorURL` property that is a regex to test whether the driver should be loaded, e.g. `/.*kayak\.com.*/`
  * Provides an optional `.monitorExcludeURL` property that is a regex to test whether the driver should NOT be loaded, e.g. `/fbcdn\.net/`. This is useful when a site loads IFrames from a URL similar to what you're monitoring.
  * Provides an optional `#waitForElement` property that will tell the driver to only start looking for flights after a certain element appears on the DOM.
  * Provides an `insertAttribution` function. Ideally this will do two things: 1) Insert the `this.extension.standardTextAttribution` text somewhere in the page's footer and 2) call `this.extension.insertBadge(parentElement, referenceElement, additionalStyleForTheBadge)` to put the standard CM1 badge in a prominent place.
  * Make sure your inserted footprint elements have class `careplane-footprint` so that the "Hide footprints" button hides them.
* `lib/drivers/zombo/zombo-air-traffic-controller.js` defines `ZomboAirTrafficController`, which:
  * Is instantiated with $ and the current url
  * Defines a `tripClass` attribute, which returns `ZomboTrip`
  * Prototype inherits from AirTrafficController
  * Provides a `#routeMatches` function that returns true if the driver should run on the current url
    * This is a bit redundant w.r.t. the standard plugin frameworks, but it allows greater customization.
  * Provides a `#tripElements` function that returns an array of flight result elements
* `lib/drivers/zombo/zombo-trip.js` defines `ZomboTrip`, which:
  * Represents a single flight result, which may contain one or more Flights
  * Is instantiated with an id, an instance of $, and a reference to the trip's flight result DOM element
  * Prototype inherits from Trip
  * Provides a `#loadFlights` function that loads all the Trip's Flights and calls a given callback with an instance of the Trip.
* `lib/drivers/zombo/zombo-flight.js` defines `ZomboFlight`, which:
  * Represents a single flight segment within a flight result
  * Prototype inherits from Flight
  * Provides attributes to be sent to [CM1 flight model](http://impact.brighterplanet.com/models/flight).
    * Currently, only the following characteristics are supported
      * airline
      * aircraft
      * origin
      * destination
      * seatClass

#### Registering your driver
1. Add it to the list in `CareplaneConfig.drivers` in the Rakefile
1. Add a build and package task in the Rakefile
1. Add the site URL(s) to the `rake/templates/google_chrome/manifest.json.erb` template
1. Add the site URL(s) to the `rake/templates/safari/careplane.safariextension/Info.plist.erb` template
1. Add driver initialization to `lib/careplane.js`. Don't forget the `Careplane#loadDriver` function!

## Versioning and releasing

There are a few rake tasks for setting the plug-in's current version that also tag the latest commit with the current version:
* `rake version` displays the current version
* `rake version:set[1.2.3]` will force a version
* `rake version:bump` and `rake version:bump:patch` will bump the patch version, e.g., 0.2.3 => 0.2.4
* `rake version:minor` will bump the minor version, e.g., 0.2.3 => 0.3.0
* `rake version:major` will bump the major version, e.g., 0.2.3 => 1.0.0

The `rake release` task will allow you to update the changelog, commit it, generate packages for most browsers, and update the careplane.org gh-pages site. You will still need to manually create the Safari extension as there is no way of automating that yet. In Safari, go to the developer menu, extension builder, then click the "build" button for careplane. Once the file is saved in careplane/safari/build, then copy the extension in to the gh-pages branch, commit it, then push.
