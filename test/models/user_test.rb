# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should create auth_token upon creation" do
    user = User.create(email: "test@example.com", password: "pass@123")
    assert_not_nil user.auth_token
  end

  test "should not save user without an email" do
    user = users(:john)
    user.email = nil
    refute user.save, "Saved the user without an email"
  end

  test "should not save user without a password" do
    user = User.new(email: "test@example.com")
    refute user.save, "Saved the user without a password"
  end

  test "should not save user with a duplicate email" do
    user = User.new(email: users(:john).email, password: "pass@123")
    refute user.save, "Saved the user with a duplicate email"
  end
end
