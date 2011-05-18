require 'bundler'
Bundler.setup

require 'cucumber/formatter/unicode' # Remove this line if you don't want Cucumber Unicode support
#require 'cucumber/web/tableish'

require 'capybara'
require 'capybara/cucumber'
require 'capybara/selenium/driver'
require 'capybara/session'

require 'sauce'
require 'sauce/capybara'
require 'selenium/webdriver'

ENV['BROWSER'] ||= 'firefox'
ENV['CAPY'] ||= 'sauce'
ENV['PROFILE'] ||= Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first ? 'Selenium' : 'default'

# Capybara defaults to XPath selectors rather than Webrat's default of CSS3. In
# order to ease the transition to Capybara we set the default here. If you'd
# prefer to use XPath just remove this line and adjust any selectors in your
# steps to use the XPath syntax.
Capybara.default_selector = :css
Capybara.register_driver :local do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new(ENV['PROFILE'])
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.timeout = 300
  Capybara::Selenium::Driver.new(app, :profile => 'Selenium',
                                 :browser => ENV['BROWSER'].to_sym,
                                 :http_client => client)
end
Capybara.register_driver :sauce do |app|
  AwesomeSauce.new({})
end
Capybara.run_server = false

World(Capybara)

Before do |scenario|
  Capybara.current_driver = ENV['CAPY'].to_sym
  @scenario = scenario
end
