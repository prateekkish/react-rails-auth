# frozen_string_literal: true

class Referral < ApplicationRecord
  belongs_to :user

  validates :email,
    presence: true,
    format: { with: Devise.email_regexp }
end
