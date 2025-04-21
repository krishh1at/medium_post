class Api::V1::UsersController < Api::V1::ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.new(registration_params)

    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token, user: UserSerializer.new(user).serializable_hash }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if user.update(update_params)
      render json: UserSerializer.new(@current_user).serializable_hash
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: UserSerializer.new(@current_user).serializable_hash
  end

  private

  def registration_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def update_params
    params.require(:user).permit(:name, :email, :role, :password, :password_confirmation)
  end
end
