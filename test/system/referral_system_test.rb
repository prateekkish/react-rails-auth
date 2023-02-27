# frozen_string_literal: true

require "test_helper"
require "application_system_test_case"

class ReferralSystemTestCase < ApplicationSystemTestCase
  def setup
    @user = User.create!(email: "jane@example.com", password: "pass@222")
    @user.referrals.create(email: "test_1@example.com")
    @user.referrals.create(email: "test_2@example.com")
  end

  test "Referrals page should list all the referrals" do
    login_user(@user.email, "pass@222")
    assert_selector "h4", text: "Your referrals"

    assert_selector "th", text: @user.referrals.first.email
    assert_selector "th", text: @user.referrals.second.email
  end
end
