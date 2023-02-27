# frozen_string_literal: true

require "application_system_test_case"
require "test_helper"

class RegisterSystemTestCase < ApplicationSystemTestCase
  test "Register a new user" do
    email = "jane@example.com"
    assert_nil User.find_by(email: email)

    visit "/register"
    fill_in "Email", with: email
    fill_in "password_field", with: "pass@222"
    fill_in "password_confirm_field", with: "pass@222"
    click_on "Register"

    assert_selector "h4", text: "Referrals"
    assert User.find_by(email: email)
  end
end
