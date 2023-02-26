# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should login a user by authenticating email and password" do
    user = User.create(email: "jane@example.com", password: "pass@222")
    post user_session_url,
      params: {
        user: {
          email: user.email,
          password: "pass@222",
        },
      },
      as: :json

    assert_response :success
    res = JSON.parse(response.body)["user"]
    assert_equal "jane@example.com", res["email"], "Email doesn't match in response"
    assert_equal user.auth_token, res["auth_token"], "Auth token doesn't match in response"
  end

  test "should not login with invalid credentials" do
    user = User.create(email: "jane@example.com", password: "pass@222")
    post user_session_url,
      params: {
        user: {
          email: user.email,
          password: "invalid_password",
        },
      },
      as: :json

    assert_response :success
    res = JSON.parse(response.body)["user"]
    assert_equal "jane@example.com", res["email"], "Email doesn't match in response"
    assert_equal user.auth_token, res["auth_token"], "Auth token doesn't match in response"
  end
end
