require_relative '../base_page'

class AccountMenuComponent < BasePage
  SCREEN_SELECTOR = ''

  ACCOUNT_MENU_BUTTON = 'account-menu-button'
  LOGOUT_LINK = 'logout-button'
  MENU_ITEMS = '.menu-items'

  def initialize()
    super(SCREEN_SELECTOR)
  end

  def sign_out
    find(:id, ACCOUNT_MENU_BUTTON).click
    find(:css, MENU_ITEMS)
    find(:id, LOGOUT_LINK).click
  end
end
