# frozen_string_literal: true

require "test_helper"

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  test "should register a user" do
    post user_registration_url,
      params: {
        user: {
          email: "jane@example.com",
          password: "pass@222",
        },
      },
      as: :json

    assert_response :created
    res = JSON.parse(response.body)
    assert_equal "jane@example.com", res["email"], "Email doesn't match in response"
    assert_equal User.last.auth_token, res["auth_token"], "Auth token doesn't match in response"
  end
end
