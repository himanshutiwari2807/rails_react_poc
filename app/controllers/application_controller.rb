class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  def authenticate_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    begin
      decoded = JwtService.decode(header)
      @current_user = User.find(decoded['user_id']) if decoded
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError, JWT::ExpiredSignature
      render json: { error: 'Not Authorized' }, status: :unauthorized and return
    end

    render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_user
  end
end
