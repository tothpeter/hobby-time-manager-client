Rails.application.routes.draw do
  get 'users/me'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users'
  }
end
