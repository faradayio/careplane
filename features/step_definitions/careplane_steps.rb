require 'active_support'
require 'active_support/time'


Given /^I am visiting "(.*)"$/ do |domain|
  Capybara.app_host = "http://#{domain}"
end

When /Careplane runs as soon as "(.+)" is visible/ do |selector|
  has_css?(selector)

  js = <<-JS
var capy = {
  log: function(str) {
    if(!$('#loggz').get(0)) {
      $(window.document.body).append('<ul id="loggz"></ul>');
    }
    $('#loggz').append('<li>' + str + '</li>');
  }
};
  JS

  js += Config.test_js_files.inject('') do |conglomerate, js_file|
    conglomerate += File.read(js_file)
  end

  js += <<-JS
TestExtension.prefs.putBoolean('hasRunPreviously', true);
TestExtension.prefs.putBoolean('sites.Kayak', true);
TestExtension.prefs.putBoolean('sites.Orbitz', true);
TestExtension.prefs.putBoolean('sites.Hipmunk', true);

TestExtensionLoader.load();
  JS

  begin
    Capybara.current_session.driver.execute_script js
  rescue Capybara::Driver::Webkit::WebkitError => e
    save_and_open_page
    raise e
  end
end

When %r/I fill in "([^"]+)" with a departure date$/ do |field|
  departure = 2.days.from_now
  When "I fill in \"#{field}\" with \"#{departure.strftime('%m/%d/%Y')}\""
end
When %r/I fill in "([^"]+)" with a return date$/ do |field|
  back = 12.days.from_now
  When "I fill in \"#{field}\" with \"#{back.strftime('%m/%d/%Y')}\""
end

When %r/I fill in "([^"]+)" with a departure date within "([^"]+)"/ do |field, context|
  departure = 2.days.from_now
  When %Q{I fill in "#{field}" with "#{departure.strftime('%m/%d/%Y')}" within "#{context}"}
end
When %r/I fill in "([^"]+)" with a return date within "([^"]+)"/ do |field, context|
  back = 12.days.from_now
  When %Q{I fill in "#{field}" with "#{back.strftime('%m/%d/%Y')}" within "#{context}"}
end

Then /I should see carbon footprints/ do
  Then 'I should see /[\d]+,[\d]+[^\s]* lbs CO2e/'
end
