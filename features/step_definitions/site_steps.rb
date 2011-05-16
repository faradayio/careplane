Given /^I am visiting "(.*)"$/ do |domain|
  Capybara.app_host = "http://#{domain}"
end
