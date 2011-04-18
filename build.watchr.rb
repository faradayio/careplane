# Run me with:
#   $ watchr gem.watchr

# --------------------------------------------------
# Rules
# --------------------------------------------------
watch(/^images\/.*/) { |md| build }
watch(/^src\/.*/) { |md| build }
watch(/^stylesheets\/.*/) { |md| build }

# --------------------------------------------------
# Signal Handling
# --------------------------------------------------
Signal.trap('QUIT') { build }       # Ctrl-\
Signal.trap('INT' ) { abort("\n") } # Ctrl-C

# --------------------------------------------------
# Helpers
# --------------------------------------------------
def build
  puts; system 'rake build'
end
