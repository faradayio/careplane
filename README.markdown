# Careplane

## Drivers

There are currently five drivers, Kayak, KayakUK, Hipmunk, Bing, and Orbitz. The Kayak driver is a good reference for JavaScript-heavy sites that update results without reloading the page. Orbitz is a text-book example of a pre-Web 2.0 travel site. Bing is unique in that it hijacks the large JSON search request sent to a Kayak API.

Driver checklist:

* Instantiated with a single argument, the current extension object (e.g. GoogleChromeExtension)
* Prototype inherits from the Driver object, which provides `#isPollingEnabled`, `#isActiveSearch`, `#prepare`, and `#load`.
* Provides a `.driverName` property (e.g. `'Kayak'`).
* Provides a `.monitorURL` property that is a regex to test whether the driver should be loaded, e.g. `/.*kayak\.com.*/`
* Provides an optional `.monitorExcludeURL` property that is a regex to test whether the driver should NOT be loaded, e.g. `/fbcdn\.net/`. This is useful when a site loads IFrames from a URL similar to what you're monitoring.
* Provides an optional `#waitForElement` property that will tell the driver to only start looking for flights after a certain element appears on the DOM.
* Provides an `insertAttribution` function. Ideally this will do two things: 1) Insert the `this.extension.standardTextAttribution` text somewhere in the page's footer and 2) call `this.extension.insertBadge(parentElement, referenceElement, additionalStyleForTheBadge)` to put the standard CM1 badge in a prominent place.
* Make sure your inserted footprint elements have class `careplane-footprint` so that the "Hide footprints" button hides them.

## New driver checklist

1. Make sure all the above requirements are met
1. Put your main driver class in `lib/drivers/my-class.js`
1. Put all other driver-specific files in `lib/drivers/my-class/`
1. Add it to the list in `CareplaneConfig.drivers` in the Rakefile
1. Add a build and package task in the Rakefile
1. Add the site URL(s) to the `rake/templates/google_chrome/manifest.json.erb` template
1. Add the site URL(s) to the `rake/templates/safari/careplane.safariextension/Info.plist.erb` template
1. Add driver initialization to `lib/careplane.js`. Don't forget the `Careplane#loadDriver` function!

## Versioning and releasing

There are a few rake tasks for setting the plugin's current version that also tag the latest commit with the current version:
* `rake version` displays the current version
* `rake version:set[1.2.3]` will force a version
* `rake version:bump` and `rake version:bump:patch` will bump the patch version, e.g., 0.2.3 => 0.2.4
* `rake version:minor` will bump the minor version, e.g., 0.2.3 => 0.3.0
* `rake version:major` will bump the major version, e.g., 0.2.3 => 1.0.0

The `rake release` task will allow you to update the changelog, commit it, generate packages for most browsers, and update the careplane.org gh-pages site. You will still need to manually create the safari extension as there is no way of automating that yet. In safari, go to the developer menu, extension builder, then click the "build" button for careplane. Once the file is saved in careplane/safari/build, then copy the extension in to the gh-pages branch, commit it, then push.
