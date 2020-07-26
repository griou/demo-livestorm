require_relative '../pages/base_page'
require_relative '../pages/components/sign_in_form_comp'

SCREEN_SELECTOR = 'h2.intro-title'.freeze

class SignInPage < BasePage
  alias_method :parent_visit, :visit

  def initialize
    super(SCREEN_SELECTOR)
    @sign_in_form = SignInFormComponent.new
  end

  def visit
    parent_visit 'https://app.livestorm.co/#/login'
  end

  def sign_in(user)
    @sign_in_form.sign_in(user)
  end

  def sign_in_and_return_fields_error(user)
    @sign_in_form.sign_in_and_return_fields_error(user)
  end

  def sign_in_and_return_form_error(user)
    @sign_in_form.sign_in_and_return_form_error(user)
  end
end
