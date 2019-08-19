Rails.application.routes.draw do

    root "welcome#home"
    get '/signup' => 'users#new'
    get '/login' => 'session#new'
    post '/login' => 'session#create'
    get '/auth/facebook/callback' => 'session#create'
    get '/logout' => 'session#destroy'
    get '/users/users_with_most_requests' => 'users#users_with_most_requests'
    get '/requests/finished_requests' => 'requests#finished_requests'
    get 'requests/unfinished_requests' => 'requests#unfinished_requests'

    resources :requests, only: [:create, :destroy, :edit, :update] do
      resources :users, only: [:show]
     end

     resources :checklists, only: [:index, :show, :create, :update, :destroy] do
       resources :requests, only: [:new, :show, :edit, :update, :destroy]
     end

     resources :users, only: [:create, :destroy, :edit, :update, :show] do
       resources :checklists, only: [:new, :edit, :show, :update, :destroy]
     end

     resources :users do
       resources :requests, only: [:show, :edit]
     end

     resources :users_requests, only: [:update]

     # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   end
