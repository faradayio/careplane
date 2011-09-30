require 'bundler'
Bundler.setup

require 'cucumber/formatter/unicode' # Remove this line if you don't want Cucumber Unicode support

require 'headless'

require 'capybara'
require 'capybara/cucumber'
require 'capybara/driver/selenium_driver'

require 'capybara/session'

require 'selenium/webdriver'

require 'capybara/mechanize'
require 'capybara/mechanize/cucumber'
require 'capybara-webkit'

ENV['BROWSER'] ||= 'firefox'
ENV['CAPY'] ||= 'webkit'
ENV['PROFILE'] ||= Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first ? Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first : 'default'

# Capybara defaults to XPath selectors rather than Webrat's default of CSS3. In
# order to ease the transition to Capybara we set the default here. If you'd
# prefer to use XPath just remove this line and adjust any selectors in your
# steps to use the XPath syntax.
Capybara.default_selector = :css
Capybara.register_driver :selenium do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new(ENV['PROFILE'])
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.timeout = 300
  Capybara::Driver::Selenium.new(app, :profile => 'Selenium',
                                 :browser => ENV['BROWSER'].to_sym,
                                 :http_client => client)
end

Capybara.run_server = false

case ENV['CAPY']
when 'selenium' then
  Capybara.javascript_driver = :selenium
  Capybara.current_driver = :selenium
when 'webkit' then
  Capybara.javascript_driver = :webkit
  Capybara.current_driver = :mechanize
end

Capybara.default_wait_time = 3600

Dir.glob('*.html') { |f| FileUtils.rm_f f }

World(Capybara)

Before do |scenario|
  @scenario = scenario
  @headless = Headless.new
  @headless.start
end

After do
  @headless.destroy
end
