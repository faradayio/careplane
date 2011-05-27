require './lib/careplane_config'
require 'fileutils'
require 'rake/clean'
require 'erb'

require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new

def sh(cmd, cwd = '.')
  puts cmd
  Dir.chdir(cwd) do
    super(cmd)
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
  :chrome_download => lambda { "pages/downloads/careplane-#{current_version}.zip" },
  :firefox_package => 'firefox/build/careplane.xpi',
  :firefox_download => lambda { "pages/downloads/careplane-#{current_version}.xpi" },
  :safari_package => 'safari/build/careplane.safariextz',
  :safari_download => lambda { "pages/downloads/careplane-#{current_version}.safariextz" }
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
filename: #{File.basename(@files["#{browser}_download".to_sym].call)}
filesize: #{File.size(@files["#{browser}_package".to_sym]) / 1000}
---
#{message}
      TXT
    end
    puts "Wrote Changelog entry for v#{current_version} to #{changelog_post(browser)}"
  end

  existing_changelog = File.read 'CHANGELOG'
  unless existing_changelog =~ /v#{current_version}/
    File.open 'CHANGELOG', 'w' do |f|
      f.puts message
      f.puts existing_changelog
    end
    puts 'Wrote CHANGELOG'
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


desc 'Update careplane.org with new version'
task :site => 'pages/' do
  sh 'git add _posts downloads', 'pages'
  sh "git commit -m 'Release for version #{current_version}'", 'pages' do |ok,res|
    verbose { puts "gh-pages updated" }
    sh 'git push -q o HEAD:gh-pages', 'pages' unless ENV['NO_PUSH']
  end
end

directory 'pages/'
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

@css_files = ['stylesheets/careplane.css']
@image_files = ['images/icon64.png']

def build(driver, target_dir = '')
  puts 'Copying files...'
  (CareplaneConfig.js_files + @css_files + @image_files).each do |file|
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
  (CareplaneConfig.js_files +
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

directory 'firefox/build'
namespace :firefox do
  desc 'Build Firefox extension'
  task :build => 'firefox:build:templates' do
    puts 'Building Firefox'
    build 'firefox', 'chrome/content'
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
      puts `zip -r build/careplane.xpi chrome defaults chrome.manifest icon.png install.rdf -x *~`
    end
  end

  namespace :develop do
    desc 'Tell Firefox to use local careplane folder to load extension'
    task :mac do
      dir = File.join(Dir.pwd, 'firefox/')
      profile = Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.default').first
      File.open("#{profile}/extensions/careplane@brighterplanet.com", 'w') do |f|
        f.puts dir
      end
    end
  end
end

namespace :google_chrome do
  task :build => 'google_chrome:build:templates' do
    puts 'Building Google Chrome'
    build_application_js 'google_chrome'
    puts 'Done'
  end
  namespace :build do
    task :templates do
      puts 'Building Google Chrome templates'
      templates 'google_chrome'
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
  desc 'Build Safari extension'
  task :build => 'safari:build:templates' do
    puts 'Building Safari'
    build 'safari', 'careplane.safariextension'
    puts 'Done'
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
      puts `zip -r build/careplane.safariextz careplane.safariextension -x *~`
    end
  end
end

desc 'Run Jasmine unit tests (requires Node.js)'
task :jasmine, :spec do |t, args|
  ENV['NODE_PATH'] = 'src'

  if args[:spec]
    exec "node spec/javascripts/support/jasmine-node.js #{args[:spec]}"
  else
    exec 'node spec/javascripts/support/jasmine-node.js'
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

desc 'Build all plugins and Jasmine'
task :build => ['firefox:build', 'google_chrome:build', 'safari:build', 'jasmine:build']

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


def profile_dir
  Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first
end

task :ensure_selenium_profile do
  if profile_dir.nil?
    puts 'Creating Selenium profile'
    `/Applications/Firefox.app/Contents/MacOS/firefox-bin -CreateProfile Selenium`
    Dir.glob('firefox_profile/*').each do |file|
      FileUtils.cp file, profile_dir
    end
  end
end

desc 'Package a Firefox profile for running Selenium tests'
task :selenium_profile => [:ensure_selenium_profile, 'pages/'] do
  FileUtils.cp 'firefox/build/careplane.xpi', File.join(profile_dir, 'extensions', 'careplane@brighterplanet.com.xpi')
  dir = Dir.pwd
  Dir.chdir profile_dir do
    puts `zip -r #{dir}/pages/selenium_profile.zip . -x *~`
  end
  sh 'git add selenium_profile.zip', 'pages'
  sh "git commit -m 'Updated Firefox Selenium profile'", 'pages' do |ok,res|
    verbose { puts "gh-pages updated" }
    sh 'git push -q o HEAD:gh-pages' unless ENV['NO_PUSH']
  end
end


task :publish => [:release, :site]


task :test => [:jasmine, :features]
task :default => :test
