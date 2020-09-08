Rails.application.routes.draw do
  resources :scores
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/login', to: 'auth#login'
  post '/login', to: 'auth#verify'
  get '/logout', to: 'auth#logout'
end
