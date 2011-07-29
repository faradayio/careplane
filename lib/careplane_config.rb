module CareplaneConfig 
  class << self
    def all_js_files
      content_script_files + worker_files
    end

    def content_script_files(browser = nil, drivers = nil)
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

    def worker_files(browser = nil)
      files = %w{
        src/CareplaneTrackerService.js
        src/Worker.js
      }
      if browser == 'firefox'
        files += %w{
          src/Driver.js
          src/drivers/Hipmunk.js
          src/drivers/Kayak.js
          src/drivers/KayakUK.js
          src/drivers/Orbitz.js
          src/Careplane.js
        }
      end
      files
    end

    def js_files(selected_drivers = nil)
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

      selected_drivers ||= drivers
      selected_drivers = [selected_drivers] unless selected_drivers.is_a?(Array)
      selected_drivers << 'Kayak' if selected_drivers == %w{KayakUK}
      selected_drivers.each do |driver|
        files << "src/drivers/#{driver}.js"
        files += Dir.glob("src/drivers/#{driver}/**/*.js").map { |f| f.sub(/^.*src/,'src') }
        files += Dir.glob("src/views/#{driver}/*.js").map { |f| f.sub(/^.*src/,'src') }
      end
      files
    end

    def jasmine_js_files
      all_js_files
    end

    def cucumber_js_files
      content_script_files 'test'
    end

    def drivers
      %w{Hipmunk Kayak KayakUK Orbitz}
    end
  end
end
