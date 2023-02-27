# frozen_string_literal: true

class ReferralsController < ApplicationController
  def index
    referrals = current_user.referrals

    render json: { referrals: referrals }, status: :ok
  end

  def create
    referral = current_user.referrals.new(referral_params)

    if referral.save
      ReferralMailer.send_referral(referral).deliver_later
      render json: { referral: referral }, status: :created
    else
      render json: { errors: referral.errors }, status: :unprocessable_entity
    end
  end

  private

  def referral_params
    params.require(:referral).permit(:email)
  end
end
