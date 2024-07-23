class SessionsController < ApplicationController
  skip_before_action :authenticate_request

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id)
      render json: { message: 'Login Successfully', token: token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
  end
end
