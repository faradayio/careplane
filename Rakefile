
require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

namespace :firefox do
  task :build do
    puts 'Building Firefox'
    `cp -R src firefox/chrome/content/`
    puts 'Done'
  end
  task :package => :build do
    Dir.chdir 'firefox' do
      puts `zip -r build/careplane.xpi chrome defaults chrome.manifest icon.png install.rdf -x *~`
    end
  end
end

task :build => 'firefox:build'
