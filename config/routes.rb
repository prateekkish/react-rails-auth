# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, skip: :all
  devise_scope :user do
    post "register", to: "registrations#create"
    post "login", to: "sessions#create"
  end

  root "home#index", as: :home

  resources :referrals, only: [:index, :create]
  get "*path", to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
