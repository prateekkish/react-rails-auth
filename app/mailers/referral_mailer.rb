# frozen_string_literal: true

class ReferralMailer < ApplicationMailer
  def send_referral(referral)
    referer_email = referral.user.email
    base_url = Rails.application.routes.url_helpers.register_url
    referral_url = URI.join(base_url, "/register?email=#{referral.email}&referrer=#{referer_email}}").to_s

    body = "Hi, #{referral.email}! #{referer_email} wants you to join us! Click here to sign up: #{referral_url}"

    mail(to: referral.email, subject: "Please join us!", body: body)
  end
end
