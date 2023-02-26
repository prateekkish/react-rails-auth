# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  respond_to :json

  before_action :authenticate_token, :authenticate_user!

  private

  def authenticate_token
    token = request.headers["X-Auth-Token"]
    email = request.headers["X-Auth-Email"]
    user = User.find_by(email: email)

    if user.present? && Devise.secure_compare(user.auth_token, token)
      sign_in(user, store: false)
    else
      render json: { error: I18n.t("auth.invalid") }, status: :unauthorized
    end
  end
end
