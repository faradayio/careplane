
require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

task :build do
  puts `zip -r careplane.xpi .`
end

task :install do
  if RUBY_PLATFORM =~ /darwin/
    puts `open -a Firefox careplane.xpi`
  else
    puts "i don't know how to install on #{RUBY_PLATFORM}"
  end
end
