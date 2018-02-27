Rails.application.routes.draw do
  namespace :me do
    resources :tasks, only: :index
  end

  resources :users do
    get :me, on: :collection
    patch :password, on: :member
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users'
  }
end
