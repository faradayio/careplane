module CareplaneConfig 
  def self.js_files
    files = %w{
      src/lib/jquery-1.5.2.min.js

      src/Preferences.js
      src/Util.js
      src/CareplaneTrackerService.js
      src/Tracker.js
      src/Driver.js
      src/HallOfFame.js

      src/Flight.js
      src/Trip.js
      src/AverageTrip.js
      src/AirTrafficController.js

      src/controllers/TripController.js

      src/drivers/Hipmunk.js
      src/drivers/Hipmunk/HipmunkFlight.js
      src/drivers/Hipmunk/HipmunkTrip.js
      src/drivers/Hipmunk/HipmunkAirTrafficController.js
      src/drivers/Hipmunk/HipmunkTripController.js

      src/drivers/Kayak.js
      src/drivers/Kayak/KayakFlight.js
      src/drivers/Kayak/KayakTrip.js
      src/drivers/Kayak/KayakAirTrafficController.js

      src/drivers/Orbitz.js
      src/drivers/Orbitz/OrbitzFlight.js
      src/drivers/Orbitz/OrbitzTrip.js
      src/drivers/Orbitz/OrbitzAirTrafficController.js

      src/views/TripInfoView.js
      src/views/TripFootprintView.js
      src/views/Orbitz/OrbitzTripFootprintView.js
      src/views/Orbitz/OrbitzTripInfoView.js
      src/views/Kayak/KayakTripFootprintView.js
      src/views/Kayak/KayakTripInfoView.js
      src/views/Hipmunk/HipmunkTripFootprintView.js
      src/views/Hipmunk/HipmunkTripInfoView.js
      src/views/Hipmunk/HipmunkTripEmbeddedInfoView.js

      src/Careplane.js
      src/ExtensionLoader.js
    }
  end

  def self.test_js_files
    self.js_files + %w{
      src/TestPreferences.js
      src/TestExtension.js
      src/TestExtensionLoader.js
    }
  end
end
