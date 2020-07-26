require_relative '../base_page'

class SignInFormComponent < BasePage
  SCREEN_SELECTOR = ''

  LOGIN_FIELD = 'you@example.com'
  PASSWORD_FIELD = 'Enter password'
  SUBMIT_BUTTON  = 'Ready to Livestorm'
  FIELDS_ERROR = '.base-form-error'
  FORM_ERROR = '.form-error-message'

  def initialize()
    super(SCREEN_SELECTOR)
  end

  def sign_in(user)
    fill_email(user['userEmail'])
    fill_password(user['userPwd'])
    submit
  end

  def sign_in_and_return_fields_error(user)
    sign_in(user)
    return page.all(FIELDS_ERROR, :visible => true).map { |el| el.text}
  end

  def sign_in_and_return_form_error(user)
    sign_in(user)
    return find(FORM_ERROR, :visible => true).text
  end

  private

  def fill_email(email)
    fill_in LOGIN_FIELD, with: email
  end

  def fill_password(password)
    fill_in PASSWORD_FIELD, with: password
  end

  def submit
    click_button SUBMIT_BUTTON
  end
end
