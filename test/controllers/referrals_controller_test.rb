# frozen_string_literal: true

require "test_helper"

class ReferralsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:john)
    @user.regenerate_auth_token if @user.auth_token.blank?
  end

  test "should get index" do
    get referrals_url, as: :json, headers: auth_headers

    assert_response :success

    res = JSON.parse(response.body)["referrals"]
    assert_equal 1, res.count

    referral = res.first
    assert_equal @user.id, referral["user_id"], "user_id should be the same"
    assert_equal @user.referrals.first.email, referral["email"], "email should be the same"
  end

  test "should create referral" do
    assert_difference -> { @user.reload.referrals.count } do
      perform_enqueued_jobs do
        post referrals_url, params: { referral: { email: "test@example.com" } }, as: :json, headers: auth_headers
      end
    end

    assert_response 201
    referral = JSON.parse(response.body)["referral"]

    assert_equal @user.id, referral["user_id"], "user_id should be the same"
    assert_equal "test@example.com", referral["email"], "email should be the same"

    assert_equal 1, ActionMailer::Base.deliveries.count
    mail = ActionMailer::Base.deliveries.last
    assert_equal "Please join us!", mail.subject
  end

  private

  def auth_headers
    {
      "X-Auth-Email": @user.email,
      "X-Auth-Token": @user.auth_token,
    }
  end
end
