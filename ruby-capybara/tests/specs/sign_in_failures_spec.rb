require 'json'
require_relative '../pages/sign_in_page'
require_relative './spec_helper.rb'

describe 'Sign in Failures', :shallow do
  before(:all) do
    file = File.read '../fixtures/users.fixture.json'
    @users = JSON.parse file
  end

  before(:each) do
    @sign_in = SignInPage.new
    @sign_in.visit
  end

  after(:each) do
    page.driver.browser.navigate.refresh
  end

  it 'should not be signed in with incorrect password' do
    @sign_in.sign_in(@users['incorrectPassword'])
    expect(@sign_in.signed_in?)
      .to be_falsey, 'User should not be signed in'
  end

  it 'should redirect to login page in case of sign in failure on server side' do
    @sign_in.sign_in(@users['incorrectPassword'])
    expect { @sign_in.wait_for_displayed }
      .not_to raise_error, 'Sign in page should be displayed'
  end
end

describe 'Sign in Field Errors', :shallow do
  before(:all) do
    file = File.read '../fixtures/users.fixture.json'
    @users = JSON.parse file
  end

  before(:each) do
    @sign_in = SignInPage.new
    @sign_in.visit
  end

  after(:each) do
    page.driver.browser.navigate.refresh
  end

  it 'empty email should return an error' do
    msg = @sign_in.sign_in_and_return_fields_error(@users['emptyEmail'])
    expect(msg[0])
      .to eq('This value is required.'), 'Incorrect email field error message'
  end

  it 'email with invalid format should return an error' do
    msg = @sign_in.sign_in_and_return_fields_error(@users['invalidEmail'])
    expect(msg[0])
      .to eq('This value should be a valid email.'), 'Incorrect email field error message'
  end

  it 'empty password should return an error' do
    msg = @sign_in.sign_in_and_return_fields_error(@users['emptyPassword'])
    expect(msg[0])
      .to eq('This value is required.'), 'Incorrect password field error message'
  end

  it 'password too short should return an error' do
    msg = @sign_in.sign_in_and_return_fields_error(@users['tooShortPassword'])
    expect(msg[0])
      .to eq(
        'This value is too short. It should have 8 characters or more.'
      ), 'Incorrect password field error message'
  end

  it 'each invalid field should return an error' do
    msg = @sign_in.sign_in_and_return_fields_error(@users['invalidFields'])
    expect(msg.size)
      .to eq(2), 'Missing field error message'
  end
end

describe 'Sign in Form Errors', :shallow do
  before(:all) do
    file = File.read '../fixtures/users.fixture.json'
    @users = JSON.parse file
  end

  before(:each) do
    @sign_in = SignInPage.new
    @sign_in.visit
  end

  it 'incorrect password should return an error' do
    msg = @sign_in.sign_in_and_return_form_error(@users['incorrectPassword'])
    expect(msg)
      .to eq(
        'Invalid login credentials. Please try again.'
      ), 'Incorrect form error message'
  end

  it 'unknown email should return an error' do
    msg = @sign_in.sign_in_and_return_form_error(@users['unknownEmail'])
    expect(msg)
      .to eq(
        'There is no Livestorm account associated with the email ' +
        @users['unknownEmail']['userEmail']
      ), 'Incorrect form error message'
  end
end
