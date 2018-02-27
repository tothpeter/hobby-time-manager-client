Rails.application.routes.draw do
  resources :users do
    get :me, on: :collection
    patch :password, on: :member
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users'
  }
end
