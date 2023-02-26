# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  respond_to :json

  skip_before_action :authenticate_token
  before_action :authenticate_password, only: :create

  def create
    sign_in(@user)

    render json: { user: @user }, status: :created
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

  def authenticate_password
    @user = User.find_by_email(session_params[:email])
    return unless @user.blank? || !@user.valid_password?(session_params[:password])

    render json: { error: I18n.t("auth.invalid") }, status: :unauthorized
  end
end
