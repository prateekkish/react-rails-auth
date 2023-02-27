# frozen_string_literal: true

require "test_helper"

class RegisterSystemTestCase < ActionDispatch::SystemTestCase
  test "Register a new user" do
    email = "jane@example.com"
    assert_nil User.find_by(email: email)

    visit "/register"
    fill_in "Email", with: email
    fill_in "password_field", with: "pass@222"
    fill_in "password_confirm_field", with: "pass@222"
    click_on "Register"

    assert_selector "h2", text: "Dashboard"
    assert User.find_by(email: email)
  end
end