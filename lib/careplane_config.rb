module CareplaneConfig 
  def self.all_js_files
    content_script_files + worker_files
  end

  def self.content_script_files(browser = nil, driver = nil)
    list = js_files(driver)
    if browser.nil?
      %w{firefox4 firefox google_chrome safari}.each do |browser|
        list += Dir.glob(File.join('src','browser',browser,'*.js'))
      end
    else
      list += Dir.glob(File.join('src','browser',browser,'*.js'))
    end
    list
  end

  def self.worker_files
    %w{
      src/CareplaneTrackerService.js
      src/Worker.js
    }
  end

  def self.js_files(driver = nil)
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
      src/views/TripInfoView.js
      src/views/TripFootprintView.js

      src/Careplane.js
    }

    if driver.nil?
      %w{Hipmunk Kayak Orbitz}.each do |driver|
        files << "src/drivers/#{driver}.js"
        files += Dir.glob("src/drivers/#{driver}/**/*.js").map { |f| f.sub(/^.*src/,'src') }
        files += Dir.glob("src/views/#{driver}/*.js").map { |f| f.sub(/^.*src/,'src') }
      end
    else
      files << "src/drivers/#{driver}.js"
      files += Dir.glob("src/drivers/#{driver}/**/*.js").map { |f| f.sub(/^.*src/,'src') }
      files += Dir.glob("src/views/#{driver}/*.js").map { |f| f.sub(/^.*src/,'src') }
    end

    files
  end

  def self.test_js_files
    self.all_js_files + %w{
      src/TestPreferences.js
      src/TestExtension.js
      src/TestExtensionLoader.js
    }
  end
end
