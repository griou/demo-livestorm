require 'json'
require_relative '../pages/sign_in_page'
require_relative '../pages/webinars_page'
require_relative './spec_helper.rb'

describe 'Sign in Success', :shallow do
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

  after(:each) do
    @webinars.sign_out
  end

  it 'should be signed in' do
    expect(@sign_in.signed_in?)
      .to be_truthy
  end

  it 'should redirect to Webinars page' do
    expect { @webinars.wait_for_displayed }
      .not_to raise_error
  end
end
