require 'rake/clean'
require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

def sh(cmd, cwd = '.')
  output = ''
  puts cmd
  Dir.chdir(cwd) do
    IO.popen(cmd) do |io|
      chunk = io.read
      output += chunk
      print chunk
    end
  end
end

BROWSERS = %w{chrome firefox safari}

def datetime
  Time.now.strftime('%Y-%m-%d')
end

def versions
  @versions ||= `git tag -l v*`.split("\n").map { |v| Gem::Version.new(v.sub('v','')) }.sort
end

def current_version
  versions.last.to_s
end
def last_version
  versions[versions.length - 2].to_s
end

def version
  File.read('VERSION').gsub(/[\s\n]+$/,'')
end

def changelog_post(browser)
  "pages/_posts/#{datetime}-careplane-#{browser}-#{current_version}.markdown"
end

@files = {
  :chrome_package => 'google_chrome/build/careplane.zip',
  :chrome_download => lambda { "pages/downloads/careplane-v#{current_version}.zip" },
  :firefox_package => 'firefox/build/careplane.xpi',
  :firefox_download => lambda { "pages/downloads/careplane-v#{current_version}.xpi" },
  :safari_package => 'safari/build/careplane.safariextz',
  :safari_download => lambda { "pages/downloads/careplane-v#{current_version}.safariextz" }
}

desc 'Update changelog (make sure you have run `rake version:bump` first)'
task :changelog, :message do |t, args|
  unless File.exist?('pages')
    puts "Run `rake pages` first"
    exit
  end

  message = args[:message]
  unless message
    commits = `git log --pretty=oneline v#{last_version}..v#{current_version}`
    prelude = <<-TXT
v#{current_version} #{datetime}
  Enter the list of changes for version 
  Here's a commit list to help jog your memory
#{commits.split("\n").map { |c| "  #{c}" }.join("\n")}
    TXT
    tempfile = '/tmp/careplane-changelog-entry.txt'
    FileUtils.rm_f tempfile
    File.open(tempfile, 'w') { |f| f.puts prelude }
    editor = ENV['GIT_EDITOR'] || ENV['VISUAL'] || ENV['EDITOR'] || 'vi'
    Process.fork do
      exec "#{editor} #{tempfile}"
    end
    Process.wait
    message = File.read(tempfile)
    FileUtils.rm_f tempfile
  end

  BROWSERS.each do |browser|
    File.open(changelog_post(browser), 'w') do |f|
      f.puts <<-TXT
---
version: #{current_version}
categories: #{browser}
filename: #{@files["#{browser}_download".to_sym].call}
---
#{message}
      TXT
    end
    puts "Wrote Changelog entry for v#{current_version} to #{changelog_post(browser)}"
  end
end


task :version do
  puts version
end
namespace :version do

  task :bump => 'version:bump:patch'

  namespace :bump do
    task :patch do
      current = version
      whole, major, minor, patch = current.match(/(\d+)\.(\d+)\.(\d+)$/).to_a
      patch = patch.to_i + 1
      task('version:set').invoke("#{major}.#{minor}.#{patch}")
    end
    task :minor do
      current = version
      whole, major, minor = current.match(/(\d+)\.(\d+)\.\d+$/).to_a
      minor = minor.to_i + 1
      task('version:set').invoke("#{major}.#{minor}.0")
    end
    task :major do
      current = version
      whole, major = current.match(/(\d+)\.\d+\.\d+$/).to_a
      major = (major.to_i + 1)
      task('version:set').invoke("#{major}.0.0")
    end
  end

  task :set, :string do |t, args|
    File.open('VERSION', 'w') { |f| f.puts args[:string] }
    puts "Version set to #{args[:string]}"
  end

  task :tag do
    sh "git tag v#{version}"
    puts "Tagged #{`git log -n 1 --pretty=oneline`} with v#{version}"
  end
end


desc 'Rebuild rocco docs'
task :docs => 'pages:sync'
directory 'pages/'

desc 'Update careplane.org with new version'
task :site => 'pages:sync' do
  rev = sh('git rev-parse --short HEAD').strip
  sh "mv docs/lib/#{gemname}/carbon_model.html docs/"
  sh 'git add *.markdown', 'docs'
  git "commit -m 'rebuild pages from #{rev}'", 'docs' do |ok,res|
    verbose { puts "gh-pages updated" }
    sh 'git push -q o HEAD:gh-pages', 'docs' unless ENV['NO_PUSH']
  end
end

task :pages => 'pages:sync'
# Update the pages/ directory clone
namespace :pages do
  desc 'Initialize the pages directory to allow versioning'
  task :sync => ['.git/refs/heads/gh-pages', 'pages/.git/refs/remotes/o'] do |f|
    sh 'git fetch -q o', 'pages'
    sh 'git reset -q --hard o/gh-pages', 'pages'
    sh 'touch pages'
  end

  file '.git/refs/heads/gh-pages' => 'pages/' do |f|
    unless File.exist? f.name
      sh 'git branch gh-pages'
    end
  end

  file 'pages/.git/refs/remotes/o' => 'pages/' do |f|
    unless File.exist? f.name
      sh 'git init -q pages'
      sh 'git remote add o ../.git', 'pages'
    end
  end
end

CLOBBER.include 'pages/.git'

@js_files = %w{
  lib/jquery-1.5.2.min.js

  src/Preferences.js
  src/Util.js
  src/Tracker.js
  src/Driver.js
  src/HallOfFame.js

  src/Flight.js
  src/Trip.js
  src/TripEvents.js
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
  FileUtils.rm_f 'google_chrome/application.js'
  (@js_files +
   %w{google_chrome/GoogleChromePreferences.js google_chrome/GoogleChromeExtension.js
      google_chrome/GoogleChromeExtensionLoader.js google_chrome/content.js}
  ).each do |file|
    puts "cat #{file} >> google_chrome/application.js"
    `cat #{file} >> google_chrome/application.js`
  end
end

def templates(target)
  @version = version
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

  namespace :develop do
    task :mac do
      dir = File.join(Dir.pwd, 'firefox/')
      profile = Dir.glob('~/Library/Application Support/Firefox/Profiles/*')[0]
      File.open("Library/Application Support/Firefox/Profiles/#{profile}/extensions/careplane@brighterplanet.com", 'w') do |f|
        f.puts dir
      end
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
    FileUtils.mkdir_p('google_chrome/build')
    Dir.chdir 'google_chrome' do
      puts `zip -r build/careplane.zip application.js background.html images manifest.json options.html stylesheets -x *~`
    end
  end
end

namespace :safari do
  namespace :build do
    task :templates do
      puts 'Building Safari templates'
      templates 'safari/careplane.safariextension'
      puts 'Done'
    end
    task :default => 'safari:build:templates' do
      puts 'Building Safari'
      build 'safari', 'careplane.safariextension'
      puts 'Done'
    end
  end

  task :package => :build do
    FileUtils.mkdir_p('safari/build')
    Dir.chdir 'safari' do
      puts `zip -r build/careplane.safariextensionz careplane.safariextension -x *~`
    end
  end
end

namespace :jasmine do
  desc 'Build Jasmine spec setup'
  task :build do
    puts 'Building Jasmine templates'
    templates 'spec'
    puts 'Done'
  end
end

namespace :func do
  desc "Generate a new funcunit test suite (provide ENV['FUNC'])"
  task :generate do
    name = ENV['FUNC']
    js = <<-JS
module("#{name}",{
  setup: function() {
    S.open('autosuggest.html')
  }
});

test("Something",function(){
  S('input').click();
  equal( S('.foo').text(), 'bar', "foo is the new bar");
});
    JS
    File.open("func/#{name}_test.js", 'w') { |f| f.puts js }

    js_files = Dir.glob('func/*.js').map do |js_file|
      "<script type='text/javascript' src='#{File.basename(js_file)}'></script>"
    end.join("\n")

    html = <<-HTML
<html>
<head>
  <link rel="stylesheet" type="text/css" href="support/qunit/qunit.css" />
  <script type="text/javascript" src="support/funcunit.js"></script>
  #{js_files}
	<title>Careplane Test Suite</title>
</head>
<body>
  <h1 id="qunit-header">Careplane Test Suite</h1>
	<h2 id="qunit-banner"></h2>
	<div id="qunit-testrunner-toolbar"></div>
	<h2 id="qunit-userAgent"></h2>
  <ol id="qunit-tests"></ol>
</body>
</html>
    HTML
    File.open("func/funcunit.html", 'w') { |f| f.puts html }
  end
end

desc 'Build all plugins and Jasmine'
task :build => ['firefox:build:default', 'google_chrome:build:default', 'safari:build:default', 'jasmine:build']

desc 'Package all plugins'
task :package => ['firefox:package', 'google_chrome:package', 'safari:package']


BROWSERS.each do |browser|
  file changelog_post(browser) => :changelog
end
directory 'pages/downloads'
task :release => (BROWSERS.map { |b| changelog_post(b) } + [:package, 'pages/downloads']) do
  %w{chrome firefox safari}.each do |browser|
    FileUtils.cp @files["#{browser}_package".to_sym], @files["#{browser}_download".to_sym].call
  end
  puts "Careplane v#{current_version} released!"
end


task :default => :build
