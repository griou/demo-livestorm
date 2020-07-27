require 'json'
require_relative '../pages/sign_in_page'
require_relative '../pages/webinars_page'
require_relative './spec_helper.rb'

describe 'Sign Out Success', :shallow do
  before(:all) do
    file = File.read '../fixtures/users.fixture.json'
    @users = JSON.parse file
  end

  before(:each) do
    @sign_in = SignInPage.new
    @sign_in.visit
    @sign_in.sign_in(@users['validUser'])
    @webinars = WebinarsPage.new
  end

  it 'should destroy session' do
    @webinars.sign_out
    @sign_in.wait_for_displayed
    expect(@sign_in.signed_in?(false))
      .to be_falsey, 'Session should be destroyed'
  end

  it 'should redirect to sign in page' do
    @webinars.sign_out
    expect { @sign_in.wait_for_displayed }
      .not_to raise_error, 'sign in page should be displayed'
  end
end
