# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "sessions",
    registrations: "registrations",
  }

  root "home#index", as: :home
end
