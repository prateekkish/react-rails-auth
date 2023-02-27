# frozen_string_literal: true

require "test_helper"
require "application_system_test_case"

class LogoutSystemTestCase < ApplicationSystemTestCase
  def setup
    @user = User.create!(email: "jane@example.com", password: "pass@222")
  end

  test "Log out of the account" do
    login_user(@user.email, "pass@222")
    click_on "logout_button"

    assert_selector "h4", text: "Login to your account"

    visit "/"
    sleep 0.5
    assert_selector "h4", text: "Login to your account"
  end
end
