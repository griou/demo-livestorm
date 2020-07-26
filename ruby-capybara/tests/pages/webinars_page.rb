require_relative '../pages/base_page'
require_relative '../pages/sign_in_page'
require_relative '../pages/components/account_menu_comp'

# Page Webinars
class WebinarsPage < BasePage
  SCREEN_SELECTOR = 'div.title'
  def initialize()
    super(SCREEN_SELECTOR)
    @account_menu = AccountMenuComponent.new
  end

  def sign_out
    @account_menu.sign_out
  end
end
