class DashboardController < ApplicationController
  def serve
    # Serve files from the public directory
    path = File.join(Rails.root, 'public', params[:path])
    
    if File.exist?(path)
      send_file path, disposition: 'inline'
    else
      render plain: 'File not found', status: :not_found
    end
  end
end
