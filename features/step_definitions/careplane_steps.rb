require 'active_support'
require 'active_support/time'


Given /^I am visiting "(.*)"$/ do |domain|
  Capybara.app_host = "http://#{domain}"
end

When /Careplane runs as soon as "(.+)" is visible/ do |selector|
  has_css?(selector)

  js = File.read File.expand_path('../../support/application.js', __FILE__)

  begin
    Capybara.current_session.driver.execute_script js
  rescue Capybara::Driver::Webkit::WebkitError => e
    save_and_open_page
    raise e
  end
end

When %r{I click the Flight Only button} do
  find('span', :text => 'Flight only').click
end


When %r{I click the "(.*)" airport} do |type|
  find(".#{type} li").click
end

When %r/I fill in "([^"]+)" with a departure date$/ do |field|
  departure = 2.days.from_now
  step "I fill in \"#{field}\" with \"#{departure.strftime('%m/%d/%Y')}\""
end
When %r/I fill in "([^"]+)" with a return date$/ do |field|
  back = 12.days.from_now
  step "I fill in \"#{field}\" with \"#{back.strftime('%m/%d/%Y')}\""
end

When %r/I fill in "([^"]+)" with a departure date within "([^"]+)"/ do |field, context|
  departure = 2.days.from_now
  step %Q{I fill in "#{field}" with "#{departure.strftime('%m/%d/%Y')}" within "#{context}"}
end
When %r/I fill in "([^"]+)" with a return date within "([^"]+)"/ do |field, context|
  back = 12.days.from_now
  step %Q{I fill in "#{field}" with "#{back.strftime('%m/%d/%Y')}" within "#{context}"}
end

Then /I should see carbon footprints/ do
  step 'I should see /[\d]+,[\d]+[^\s]* lbs CO2e/'
end
