# Run me with:
#   $ watchr gem.watchr

# --------------------------------------------------
# Rules
# --------------------------------------------------
watch(/^images\/.*/) { |md| build }
watch(/^src\/.*/) { |md| build }
watch(/^stylesheets\/.*/) { |md| build }
watch(/^google_chrome\/Google[A-Za-z]+.js/) { |md| build }
watch(/^firefox\/chrome\/content\/Firefox[A-Za-z]+.js/) { |md| build }
watch(/Rakefile/) { |md| build }
watch(/rake\/.*/) { |md| build }

# --------------------------------------------------
# Signal Handling
# --------------------------------------------------
begin
  Signal.trap('QUIT') { build }       # Ctrl-\
rescue ArgumentError
end
Signal.trap('INT' ) { abort("\n") } # Ctrl-C

# --------------------------------------------------
# Helpers
# --------------------------------------------------
def build
  puts; system 'rake build'
end
