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

class MySauce < Sauce::Capybara::Driver
  def browser
    unless @browser
      puts "[Connecting to Sauce OnDemand...]"
      @config = Sauce.get_config
      @browser = Sauce::Selenium2.new(Sauce.get_config.opts)
      at_exit do
        @browser.quit
      end
    end
    @browser
  end

  def reset!
    @browser = nil
  end

  def url(path)
    if path =~ /^http/
      path
    else
      "#{@config.browser_url}#{path}"
    end
  end
end


# Capybara defaults to XPath selectors rather than Webrat's default of CSS3. In
# order to ease the transition to Capybara we set the default here. If you'd
# prefer to use XPath just remove this line and adjust any selectors in your
# steps to use the XPath syntax.
Capybara.default_selector = :css
Capybara.register_driver :firefox_custom do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new(profile_path)
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.timeout = 300
  Capybara::Selenium::Driver.new(app, :profile => profile,
                                 :browser => ENV['BROWSER'].to_sym,
                                 :os => 'Windows 2008',
                                 :http_client => client,
                                 :timeout_in_second => 300)
end
Capybara.register_driver :sauce do |app|
  #profile = Selenium::WebDriver::Firefox::Profile.new(profile_path)
  MySauce.new({}) #(:profile => profile)
end
Capybara.run_server = false

World(Capybara)

Before do |scenario|
  Capybara.current_driver = :sauce
  @scenario = scenario
end
