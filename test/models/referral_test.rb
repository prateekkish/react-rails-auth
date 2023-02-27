# frozen_string_literal: true

require "test_helper"

class ReferralTest < ActiveSupport::TestCase
  setup do
    @user = users(:john)
  end
  test "should not save referral without email" do
    referral = @user.referrals.new
    assert_not referral.save, "Saved the referral without an email"
  end

  test "should not save referral with invalid email" do
    referral = @user.referrals.new(email: "invalid_email")
    assert_not referral.save, "Saved the referral with invalid email"
  end

  test "should not save referral without a user" do
    assert_not Referral.new(email: "jane@example.com").save, "Saved the referral without a user"
  end

  test "should save referral with valid email" do
    referral = @user.referrals.new(email: "jane@example.com")
    assert referral.save
  end
end
