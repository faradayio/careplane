Given /^I am visiting "(.*)"$/ do |domain|
  Sauce.config do |config|
    config.job_name = @scenario.name
    config.browser_url = "http://#{domain}"
    config.browsers = [
      ["Windows 2008", "firefox", "4."]
    ]
    #config.firefox_profile_url = 'http://careplane.org'
  end
  Capybara.current_session.reset!
end
