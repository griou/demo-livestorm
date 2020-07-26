
module Helpers
  def signed_in?(signing=true)
    begin
      browser = Capybara.current_session.driver.browser
      Timeout.timeout(Capybara.default_max_wait_time) do
        until browser.manage.all_cookies.select { |cook, _val| cook[:name] == 'refresh_token' }.size == (signing ? 1 : 0)
        end
        return signing
      end
    rescue
      return !signing
    end
  end
end
