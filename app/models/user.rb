# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_token :auth_token

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable

  has_many :referrals, dependent: :destroy
end
