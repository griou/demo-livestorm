require 'capybara/rspec'
require 'allure-rspec'
require 'uuid'
require 'browserstack/local'
require 'parallel'

TASK_ID = (ENV['TASK_ID'] || 0).to_i
CONFIG_NAME = ENV['CONFIG_NAME'] || 'local'

RSpec.configure do |c|
  include Capybara::DSL
  c.formatter = AllureRspecFormatter
  Capybara.default_max_wait_time = 15

  c.before do |_example|
    Capybara.run_server = false
    Capybara.save_path = 'allure-results/screenshots'
    Capybara.app_host = 'https://www.livestorm.co'

    case ENV['CONFIG_NAME']
    when 'local'
      @browser = (ENV['BROWSER'] == 'chrome' ? 'chrome' : 'firefox').to_sym
      Capybara.register_driver @browser do |app|
        Capybara::Selenium::Driver.new(
          app,
          browser: @browser,
        )
      end
      Capybara.default_driver = @browser
      Capybara.javascript_driver = @browser

    when 'remote'
      @browser = (ENV['BROWSER'] == 'chrome' ? 'chrome' : 'firefox').to_sym
      Capybara.register_driver :remote_browser do |app|
        Capybara::Selenium::Driver.new(
          app,
          browser: :remote,
          url: 'http://localhost:4444/wd/hub',
          desired_capabilities: @browser
        )
      end
      Capybara.default_driver = :remote_browser

    when 'browserstack'
      CONFIG = YAML.safe_load(File.read(File.join(Dir.pwd, '../config/browserstack.config.yml')))
      CONFIG['user'] = ENV['BROWSERSTACK_USERNAME'] || CONFIG['user']
      CONFIG['key'] = ENV['BROWSERSTACK_ACCESS_KEY'] || CONFIG['key']
      
      Capybara.register_driver :browserstack do |app|
        @caps = CONFIG['common_caps'].merge(CONFIG['browser_caps'][TASK_ID])

        Capybara::Selenium::Driver.new(app,
          browser: :remote,
          url: "https://#{CONFIG['user']}:#{CONFIG['key']}@#{CONFIG['server']}/wd/hub",
          desired_capabilities: @caps
        )
      end
      Capybara.default_driver = :browserstack
    end
  end

  c.after do |example|
    if example.exception
      screenshots_rel_path = File.join(
        'allure-results',
        'screenshots',
        UUID.new.generate + '.png'
      )
      example.add_attachment(
        name: 'Error Screenshot',
        source: File.new(page.save_screenshot(File.join(Dir.pwd, screenshots_rel_path))),
        type: Allure::ContentType::PNG
      )
    end
    browser = Capybara.current_session.driver.browser
    if browser.respond_to?(:clear_cookies)
      # Rack::MockSession
      browser.clear_cookies
    elsif browser.respond_to?(:manage) && browser.manage.respond_to?(:delete_all_cookies)
      # Selenium::WebDriver
      browser.manage.delete_all_cookies
    else
      raise "Don't know how to clear cookies. Weird driver?"
    end
    Capybara.use_default_driver
    Capybara.app_host = nil
  end
end

AllureRspec.configure do |config|
  config.results_directory = 'allure-results'
  config.clean_results_directory = true
  config.logging_level = Logger::INFO
end

# monkey patch to avoid reset sessions
class Capybara::Selenium::Driver < Capybara::Driver::Base
  def reset!
    if @browser
      @browser.navigate.to('about:blank')
    end
  end
end

# Code to stop browserstack local after end of test
at_exit do
  if ENV['CONFIG_NAME'] == 'browserstack'
    @bs_local.stop unless @bs_local.nil?
  end
end
