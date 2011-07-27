module CareplaneConfig 
  def self.all_js_files
    content_script_files + worker_files
  end

  def self.content_script_files(browser = nil, drivers = nil)
    list = js_files(drivers)
    if browser.nil?
      %w{firefox google_chrome safari test}.each do |browser|
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

  def self.js_files(drivers = nil)
    files = %w{
      src/lib/jquery-1.5.2.min.js

      src/Preferences.js
      src/Util.js
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

    drivers ||= %w{Hipmunk Kayak KayakUK Orbitz}
    drivers = [drivers] unless drivers.is_a?(Array)
    drivers.each do |driver|
        files << "src/drivers/#{driver}.js"
        files += Dir.glob("src/drivers/#{driver}/**/*.js").map { |f| f.sub(/^.*src/,'src') }
        files += Dir.glob("src/views/#{driver}/*.js").map { |f| f.sub(/^.*src/,'src') }
      end
    files
  end

  def self.jasmine_js_files
    self.all_js_files
  end

  def self.cucumber_js_files
    self.content_script_files 'test'
  end
end
