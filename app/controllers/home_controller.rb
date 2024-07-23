class HomeController < ApplicationController

  def index
    render json: { message: 'Welcome to the Home Page!', user: @current_user }
  end
end
