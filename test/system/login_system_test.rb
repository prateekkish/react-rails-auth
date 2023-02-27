# frozen_string_literal: true

require "test_helper"
require "application_system_test_case"

class LoginSystemTestCase < ApplicationSystemTestCase
  def setup
    @user = User.create!(email: "jane@example.com", password: "pass@222")
  end

  test "Login with correct credentials" do
    visit "/login"
    fill_in "Email", with: @user.email
    fill_in "Password", with: "pass@222"
    click_on "Login"
    assert_selector "#logout_button"
  end
end
