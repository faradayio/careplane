require 'active_support'
require 'active_support/inflector'
require 'fileutils'
require 'erb'

require 'cucumber'
require 'cucumber/rake/task'

ENV['NODE_PATH'] = 'lib'

Cucumber::Rake::Task.new

module CareplaneConfig 
  extend self

  def dasherize(str)
    str.gsub(/KayakUK/, 'kayak-uk').
      gsub(/[a-z][A-Z]/) { |s| s[0] + '-' + s[1].downcase }.
      gsub(/[A-Z]/) { |s| s.downcase }
  end

  def browsers
    %w{chrome firefox safari}
  end

  def drivers
    %w{Bing Hipmunk Kayak KayakUK Orbitz}
  end

  def monitorURL(driverName)
    str = `NODE_PATH=./node_modules node -e "window = require('jsdom').jsdom('<html><body></body></html>').createWindow(); console.log(require('./lib/drivers/#{dasherize(driverName)}').monitorURL);"`
    str.split.first
  end
end

def psh(cmd, cwd = '.')
  Dir.chdir(cwd) do
    sh cmd
  end
end

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
  "_posts/#{datetime}-careplane-#{browser}-#{current_version}.markdown"
end

def browserify(entry_point_path, output_path, options = {})
  puts "Browserifying #{entry_point_path} into #{output_path}"

  if options[:firefox] && !File.symlink?('node_modules/jquery-firefox')
    File.link('lib/node_modules/jquery-firefox', 'node_modules/jquery-firefox') rescue true
  end

  cmd = "./node_modules/.bin/browserify -e #{entry_point_path} -o #{output_path}"
  if options[:jquery]
    jquery_alias = options[:firefox] ? 'jquery-firefox' : 'jquery-browserify'
    cmd += " -a jquery:#{jquery_alias} -r #{jquery_alias}"
  end
  if options[:firefox]
    underscore_alias = 'underscore-firefox'
    cmd += " -a underscore:#{underscore_alias} -r #{underscore_alias}"
  end
  `#{cmd}`

  puts 'Done'
end

@files = {
  :chrome_package => 'google_chrome/build/careplane.zip',
  :chrome_download => lambda { "downloads/careplane-#{current_version}.zip" },
  :firefox_package => 'firefox/build/careplane.xpi',
  :firefox_download => lambda { "downloads/careplane-#{current_version}.xpi" },
  :safari_package => 'safari/build/careplane.safariextz',
  :safari_download => lambda { "downloads/careplane-#{current_version}.safariextz" }
}

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

    Rake::Task['build'].invoke
    psh 'git add VERSION'
    psh "git commit -m 'Version bump to #{args[:string]}'"
    Rake::Task['version:tag'].invoke

    puts "Version set to #{args[:string]}"
  end

  task :tag do
    psh "git tag v#{version}"
    puts "Tagged #{`git log -n 1 --pretty=oneline`} with v#{version}"
  end
end


task :pages => 'pages:publish'
# Update the pages/ directory clone
namespace :pages do
  desc 'Initialize the pages directory to allow versioning'
  task :sync => '.git/refs/heads/gh-pages' do |f|
    psh 'git checkout gh-pages'
    psh 'git pull'
    psh 'git checkout master'
  end

  file '.git/refs/heads/gh-pages' do |f|
    unless File.exist? f.name
      psh 'git fetch origin'
      psh 'git checkout -b gh-pages --track origin/gh-pages'
    end
  end

  desc 'Build all packages and copy them to gh-pages'
  task :publish => [:package, 'pages:sync'] do
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

    message = File.read tempfile

    psh "cat CHANGELOG >> #{tempfile}"
    psh "cp #{tempfile} CHANGELOG"
    FileUtils.rm_f tempfile

    psh 'git add CHANGELOG'
    psh 'git commit -m "Updated CHANGELOG"'
    psh 'git push origin master'

    packages = {};
    %w{chrome firefox safari}.each do |browser|
      packages[browser] = File.read @files["#{browser}_package".to_sym]
    end

    puts `git checkout gh-pages`

    CareplaneConfig.browsers.each do |browser|
      File.open(changelog_post(browser), 'w') do |f|
        f.puts <<-TXT
---
version: #{current_version}
categories: #{browser}
filename: #{File.basename(@files["#{browser}_download".to_sym].call)}
filesize: #{File.size(@files["#{browser}_package".to_sym]) / 1000}
---
#{message}
        TXT
      end
      puts "Wrote Changelog entry for v#{current_version} to #{changelog_post(browser)}"
    end

    %w{chrome firefox safari}.each do |browser|
      File.open(@files["#{browser}_download".to_sym].call, 'w') { |f| f.puts packages[browser] }
    end

    psh 'git add _posts downloads'
    psh "git commit -m 'Release for version #{current_version}'"
    psh 'git push origin gh-pages'

    psh 'git checkout master'
  end
end

@css_files = ['stylesheets/careplane.css']
@image_files = ['images/icon64.png']

def templates(target)
  @version = version
  Dir.glob(File.join('rake', 'templates', target, '**/*.erb')).each do |template|
    erb = ERB.new File.read(template)
    filename = File.basename template, '.erb'
    target_dir = File.dirname(template).sub!(/^rake\/templates\//,'')
    File.open(File.join(target_dir, filename), 'w') { |f| f.puts erb.result(binding) }
  end
end

directory 'firefox/build'
namespace :firefox do
  desc 'Build Firefox extension'
  task :build => 'firefox:build:templates' do
    puts 'Building Firefox'

    puts 'Copying files...'
    (@css_files + @image_files).each do |asset|
      destination = File.join('firefox', 'data', File.basename(asset))
      FileUtils.cp asset, destination
    end
    puts 'Done'

    browserify 'lib/firefox.js', 'firefox/data/application.js', :firefox => true, :jquery => true
    FileUtils.mkdir_p 'firefox/data/browser/firefox'
    FileUtils.cp 'lib/browser/firefox/jquery-1.6.4.min.js', 'firefox/data/browser/firefox/jquery-1.6.4.min.js'
    FileUtils.cp 'lib/browser/firefox/underscore-min.js', 'firefox/data/browser/firefox/underscore-min.js'

    %w{
      lib/careplane-tracker-service.js
      lib/worker.js
      lib/browser/firefox/firefox-careplane-tracker-service.js
      lib/browser/firefox/firefox-worker.js
    }.each do |file|
      destination = File.join 'firefox', 'lib', file.sub(/^lib\//, '')
      FileUtils.mkdir_p(File.dirname(destination))
      puts [file, destination].join(' > ')
      FileUtils.cp file, destination
    end
    puts 'Done'
  end
  namespace :build do
    task :templates do
      puts 'Building Firefox templates'
      templates 'firefox'
      puts 'Done'
    end
  end
  desc "Package Firefox extension into #{@files[:firefox_package]} file"
  task :package => [:build, 'firefox/build'] do
    Dir.chdir 'firefox' do
      puts `../moz-addon-sdk/bin/cfx xpi`
      FileUtils.mv 'careplane.xpi', 'build/careplane.xpi'
    end
  end

  task :develop => 'firefox:build' do
    Dir.chdir 'firefox' do
      #puts `../moz-addon-sdk/bin/cfx run --addons=../moz-addon-sdk/firebug-1.7.3.xpi`
      puts `../moz-addon-sdk/bin/cfx run`
    end
  end
end

namespace :google_chrome do
  desc 'Build Google Chrome extension'
  task :build => 'google_chrome:build:templates' do
    puts 'Building Google Chrome'

    puts 'Copying assets...'
    (@css_files + @image_files).each do |file|
      destination = File.join('google_chrome', file)
      FileUtils.mkdir_p File.dirname(destination)
      puts "#{file} > #{destination}"
      FileUtils.cp file, destination
    end

    browserify 'lib/google-chrome.js', 'google_chrome/application.js', :jquery => true
    browserify 'lib/google-chrome-background.js', 'google_chrome/background.js'
    FileUtils.cp 'lib/hipmunk-spy.js', 'google_chrome/hipmunk-spy.js'
  end
  namespace :build do
    task :templates do
      puts 'Building Google Chrome templates'
      templates 'google_chrome'
      puts 'Done'
    end
  end

  desc "Package Google Chrome extension into #{@files[:chrome_package]} file"
  task :package => :build do
    FileUtils.mkdir_p('google_chrome/build')
    Dir.chdir 'google_chrome' do
      puts `zip -r build/careplane.zip application.js background.js background.html images manifest.json options.html stylesheets -x *~`
    end
  end
end

namespace :safari do
  directory 'safari/build'

  desc 'Build Safari extension'
  task :build => ['safari/build', 'safari:build:templates'] do
    puts 'Building Safari'

    puts 'Copying assets...'
    (@css_files + @image_files).each do |file|
      destination = File.join('safari/careplane.safariextension', file)
      FileUtils.mkdir_p File.dirname(destination)
      puts "#{file} > #{destination}"
      FileUtils.cp file, destination
    end

    browserify 'lib/safari.js', 'safari/careplane.safariextension/application.js', :jquery => true
    browserify 'lib/safari-background.js', 'safari/careplane.safariextension/background.js'
    FileUtils.cp 'lib/hipmunk-spy.js', 'safari/careplane.safariextension/hipmunk-spy.js'
  end
  namespace :build do
    task :templates do
      puts 'Building Safari templates'
      templates 'safari/careplane.safariextension'
      puts 'Done'
    end
  end

  desc "Package Safari extension into #{@files[:safari_package]} file"
  task :package => :build do
    FileUtils.mkdir_p('safari/build')
    Dir.chdir 'safari' do
      #puts `xar -cvf build/careplane.safariextz careplane.safariextension`
      #puts `xar -f build/careplane.safariextz --sign --data-to-sign careplane_sha1_hash.dat --sig-size \`cat ~/documents1/technology/careplane/siglen.txt\` --cert-loc ~/documents1/technology/careplane/careplane.der --cert-loc certs/cert01 --cert-loc certs/cert02`
      #puts `(echo "3021300906052B0E03021A05000414" | xxd -r -p; cat careplane_sha1_hash.dat) | openssl rsautl -sign -inkey ~/documents1/technology/careplane.pem > signature.dat`
      #puts `xar --inject-sig signature.dat -f build/careplane.safariextz`
    end
  end
end

desc 'Check the syntax of all Careplane source files (requires Node.js)'
task :syntax, :file do |t, args|
  if args[:file]
    exec "`npm bin`/jshint #{args[:file]}"
  else
    files = Dir.glob('lib/**/*.js') + Dir.glob('spec/**/*.js')
    files.each do |file|
      print file + '...' 
      puts `\`npm bin\`/jshint #{file}`
    end
  end
end

task :features => 'features:build' do
  exec 'bundle exec cucumber features'
end
namespace :features do
  task :build do
    browserify 'lib/features.js', 'features/support/application.js'
  end
end

desc 'Build all plugins and Jasmine'
task :build => ['firefox:build', 'google_chrome:build', 'safari:build']

desc 'Package all plugins'
task :package => ['firefox:package', 'google_chrome:package', 'safari:package']

desc 'Build packages, copy them to gh-pages, update website links, push'
task :release => 'pages:publish'

task :test => [:examples, :features]
task :default => :test
