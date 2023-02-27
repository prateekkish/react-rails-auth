# frozen_string_literal: true

require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, screen_size: [1400, 1400]

  def login_user(email, password)
    visit("/login")
    fill_in("Email", with: email)
    fill_in("Password", with: password)
    click_on("Login")
  end
end
