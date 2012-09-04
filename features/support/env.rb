require 'bundler'
Bundler.setup

require 'cucumber/formatter/unicode' # Remove this line if you don't want Cucumber Unicode support

require 'capybara'
require 'capybara/cucumber'
require 'capybara/session'

#ENV['BROWSER'] ||= 'firefox'
#ENV['CAPY'] ||= 'webkit'
#ENV['PROFILE'] ||= Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first ? Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first : 'default'

# Capybara defaults to XPath selectors rather than Webrat's default of CSS3. In
# order to ease the transition to Capybara we set the default here. If you'd
# prefer to use XPath just remove this line and adjust any selectors in your
# steps to use the XPath syntax.
Capybara.default_selector = :css
Capybara.run_server = false
Capybara.default_wait_time = 3600

require 'capybara-webkit'
Capybara.default_driver = :webkit

Dir.glob('*.html') { |f| FileUtils.rm_f f }

World(Capybara)

Before do |scenario|
  if Capybara.current_driver == :webkit
    require 'headless'

    @scenario = scenario
    @headless = Headless.new
    @headless.start
  end
end

After do
  @headless.destroy if Capybara.current_driver == :webkit
end

Capybara.register_driver :selenium_chrome do |app|
  require 'selenium-webdriver'
  profile = Selenium::WebDriver::Chrome::Profile.new
  profile.add_extension File.expand_path(%w(.. .. .. google_chrome build careplane.zip).join('/'), __FILE__)
  Capybara::Selenium::Driver.new app, :browser => :chrome, :profile => profile
end

Capybara.register_driver :selenium_firefox do |app|
  require 'selenium-webdriver'
  profile = Selenium::WebDriver::Firefox::Profile.new
  profile.add_extension File.expand_path(%w(.. .. .. firefox build careplane.xpi).join('/'), __FILE__)
  Capybara::Selenium::Driver.new app, :browser => :firefox, :profile => profile
end

Before("@chrome") do
  puts 'Building package...'
  puts `rake google_chrome:package`, 'Done!'
  Capybara.current_driver = :selenium_chrome
end

Before("@firefox") do
  puts 'Building package...'
  puts `rake firefox:package`, 'Done!'
  Capybara.current_driver = :selenium_firefox
end
