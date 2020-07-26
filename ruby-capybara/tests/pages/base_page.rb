require 'capybara/dsl'
#require_relative '../specs/config'
require_relative '../helpers/sign_in_helper'

class BasePage
#  include Config
  include Helpers
  include Capybara::DSL

  def initialize(screen_selector)
    @screen_selector = screen_selector
  end

  def visit(url_path)
    if url_path.start_with? 'http'
      Capybara::DSL::visit(url_path)
    else
      Capybara::DSL::visit(Capybara.app_host + url_path) 
    end
  end

  def wait_for_displayed()
    find(@screen_selector, :visible => true)
  end

end
