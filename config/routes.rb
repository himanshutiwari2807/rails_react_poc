Rails.application.routes.draw do
  root 'home#index'
  
  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index]
   end
  end

 
  
   get '/*path' => 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
