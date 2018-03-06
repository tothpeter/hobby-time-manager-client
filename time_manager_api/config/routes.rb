Rails.application.routes.draw do
  namespace :api, defaults: { format: :json }, constraints: { subdomain: 'api' }, path: '' do
    namespace :me do
      jsonapi_resources :tasks do
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
  end

  devise_for :users, controllers: {
    sessions: 'api/users/sessions',
    registrations: 'users'
  }

  namespace :development do
    get 'tasks_export'
  end
end
