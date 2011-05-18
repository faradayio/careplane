class AwesomeSauce < Sauce::Capybara::Driver
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


