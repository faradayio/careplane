require 'bundler'
Bundler.setup

require 'cucumber/formatter/unicode' # Remove this line if you don't want Cucumber Unicode support

require 'headless'

require 'capybara'
require 'capybara/cucumber'
require 'capybara/session'
require 'capybara-webkit'

ENV['BROWSER'] ||= 'firefox'
ENV['CAPY'] ||= 'webkit'
ENV['PROFILE'] ||= Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first ? Dir.glob('/Users/dkastner/Library/Application Support/Firefox/Profiles/*.Selenium').first : 'default'

# Capybara defaults to XPath selectors rather than Webrat's default of CSS3. In
# order to ease the transition to Capybara we set the default here. If you'd
# prefer to use XPath just remove this line and adjust any selectors in your
# steps to use the XPath syntax.
Capybara.default_selector = :css
Capybara.run_server = false
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
