class Api::V1::Admin::ApplicationController < Api::V1::ApplicationController
  include Pundit::Authorization

  before_action :creator?

  private

  def creator?
    return if current_user.creator?

    render json: { errors: "permission denied" }, status: :forbidden
  end
end
