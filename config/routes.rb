Rails.application.routes.draw do

    root "welcome#home"
    get '/signup' => 'users#new'
    get '/login' => 'session#new'
    post '/login' => 'session#create'
    get '/auth/facebook/callback' => 'session#create'
    get '/logout' => 'session#destroy'
    get '/users/users_with_most_requests' => 'users#users_with_most_requests'
    get '/requests/finished_requests' => 'requests#finished_requests'
    get '/requests/unfinished_requests' => 'requests#unfinished_requests'

    resources :requests do
      resources :users
     end

     resources :checklists do
       resources :requests
     end

     resources :users do
       resources :checklists
     end

     resources :users do
       resources :requests
     end

     resources :users_requests

     # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   end
