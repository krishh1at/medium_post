class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  skip_before_action :verify_authenticity_token

  private

  def not_found
    render json: { errors: ["record not found"] }
  end
end
