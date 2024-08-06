Rails.application.routes.draw do
  root 'home#index'
  
  namespace :api do
    namespace :v1 do
      resources :questions, only: [:index]
    end
  end

  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'



  # Route for serving SCORM content
  get 'scormPlayer/SCORM/*path', to: 'dashboard#serve'
  # Route for serving SCORM content
  get 'scormPlayer/Leadingscorm/*path', to: 'dashboard#serve'
  # Serve static files under Course-dashboard
  get 'Course-dashboard/*path', to: 'dashboard#serve'

  # Catch-all route for serving the React app
  get '*path', to: 'home#index'

  # Catch-all route (if needed for other dynamic routes)
  # get '*path', to: 'application#not_found' # Optional catch-all route
end
