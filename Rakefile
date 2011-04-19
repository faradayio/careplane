
require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

@js_files = %w{
  src/Preferences.js
  src/Util.js
  src/Driver.js

  src/Flight.js
  src/Trip.js
  src/AirTrafficController.js

  src/controllers/TripController.js

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
  src/views/Kayak/KayakTripFootprintView.js

  src/Careplane.js
}
@css_files = ['stylesheets/careplane.css']
@image_files = ['images/icon64.png']

def build(driver, target_dir = '')
  puts 'Copying files...'
  (@js_files + @css_files + @image_files).each do |file|
    destination = File.join(driver, target_dir, file)
    FileUtils.mkdir_p(File.dirname(destination))
    puts file
    FileUtils.cp file, destination
  end
end

def build_application_js(driver, target_dir = '')
  puts 'Copying assets...'
  (@css_files + @image_files).each do |file|
    destination = File.join(driver, target_dir, file)
    FileUtils.mkdir_p(File.dirname(destination))
    puts file
    FileUtils.cp file, destination
  end

  puts 'Building application.js...'
  `echo '' > google_chrome/application.js`
  (@js_files +
   %w{google_chrome/GoogleChromePreferences.js google_chrome/GoogleChromeExtension.js
      google_chrome/GoogleChromeExtensionLoader.js google_chrome/content.js}
  ).each do |file|
    puts "cat #{file} >> google_chrome/application.js"
    `cat #{file} >> google_chrome/application.js`
  end
end

def templates(target)
  @version = File.read('VERSION')
  Dir.glob(File.join('rake', 'templates', target, '**/*.erb')).each do |template|
    erb = ERB.new File.read(template)
    filename = File.basename template, '.erb'
    target_dir = File.dirname(template).sub!(/^rake\/templates\//,'')
    File.open(File.join(target_dir, filename), 'w') { |f| f.puts erb.result(binding) }
  end
end

namespace :firefox do
  namespace :build do
    task :templates do
      puts 'Building Firefox templates'
      templates 'firefox'
      puts 'Done'
    end
    task :default => 'firefox:build:templates' do
      puts 'Building Firefox'
      build 'firefox', 'chrome/content'
      puts 'Done'
    end
  end
  task :package => :build do
    Dir.chdir 'firefox' do
      puts `zip -r build/careplane.xpi chrome defaults chrome.manifest icon64.png install.rdf -x *~`
    end
  end
end

namespace :google_chrome do
  namespace :build do
    task :templates do
      puts 'Building Google Chrome templates'
      templates 'google_chrome'
      puts 'Done'
    end
    task :default => 'google_chrome:build:templates' do
      puts 'Building Google Chrome'
      build_application_js 'google_chrome'
      puts 'Done'
    end
  end

  task :package => :build do
    Dir.chdir 'google_chrome' do
      puts `zip -r build/careplane.zip src manifest.json icon64.png -x *~`
    end
  end
end

task :build => ['firefox:build:default', 'google_chrome:build:default']
