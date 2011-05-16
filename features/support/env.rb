require 'cucumber/formatter/unicode' # Remove this line if you don't want Cucumber Unicode support
require 'cucumber/web/tableish'

require 'capybara'
require 'capybara/cucumber'
require 'capybara/session'

# Capybara defaults to XPath selectors rather than Webrat's default of CSS3. In
# order to ease the transition to Capybara we set the default here. If you'd
# prefer to use XPath just remove this line and adjust any selectors in your
# steps to use the XPath syntax.
Capybara.default_selector = :css
Capybara.register_driver :firefox_custom do |app|
  require 'selenium/webdriver'
  profile_path = '/Users/dkastner/Library/Application Support/Firefox/Profiles/vqj2tb9j.default'
  profile = Selenium::WebDriver::Firefox::Profile.new(profile_path)
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.timeout = 300
  driver = Capybara::Selenium::Driver.new(app, :profile => profile, :browser => :firefox, :http_client => client)
  #driver = Capybara::Selenium::Driver.new(app, :browser => :remote,
                                 #:url => "http://127.0.0.1:4444/wd/hub",
                                 #:desired_capabilities => :firefox)

  driver
end
Capybara.current_driver = :firefox_custom
Capybara.run_server = false

World(Capybara)
