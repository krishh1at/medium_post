Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :admin do
        resources :categories
        resources :posts do
          patch :update_status, on: :member
        end
      end

      resources :posts,    only: [:index, :show] do
        resources :comments
      end

      resources :sessions, only: [:create, :destroy]
      resources :users,    only: [:create, :update, :show]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check

  # Serve React frontend for all other paths
  get '*path', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root "home#index"
end
