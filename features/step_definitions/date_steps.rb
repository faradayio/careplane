require 'active_support'
require 'active_support/time'

When /I fill in "(.*)" with a departure date/ do |field|
  departure = 2.days.from_now
  When "I fill in \"#{field}\" with \"#{departure.strftime('%m/%d/%Y')}\""
end
When /I fill in "(.*)" with a return date/ do |field|
  back = 12.days.from_now
  When "I fill in \"#{field}\" with \"#{back.strftime('%m/%d/%Y')}\""
end
