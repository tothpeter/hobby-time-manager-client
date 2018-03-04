Rails.application.routes.draw do
  namespace :me do
    resources :tasks do
      get :export, on: :collection
    end
  end

  jsonapi_resources :tasks do
    get :export, on: :collection
  end

  resources :users do
    get :me, on: :collection
    patch :password, on: :member
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users'
  }

  namespace :development do
    get 'tasks_export'
  end
end
