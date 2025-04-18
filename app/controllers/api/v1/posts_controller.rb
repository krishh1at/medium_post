class Api::V1::PostsController < Api::V1::ApplicationController
  def index
    posts = current_user.posts.page(params[:page])

    render json: PostSerializer.new(posts).serializable_hash
  end

  def show
    render json: PostSerializer.new(post).serializable_hash
  end

  def create
    post = current_user.posts.build(post_params)

    if post.save
      render json: PostSerializer.new(post).serializable_hash
    else
      render json: { errors: post.errors.full_messages }
    end
  end

  def update
    if post.update(post_params)
      render json: PostSerializer.new(post).serializable_hash
    else
      render json: { errors: post.errors.full_messages }
    end
  end

  def update_status
    if post.update(status: params[:post][:status])
      render json: { success: "successfully." }
    else
      render json: { errors: post.errors.full_messages }
    end
  end

  def destroy
    if post.destroy
      render json: { success: "deleted successfully." }
    else
      render json: { errors: "not deleted." }
    end
  end

  private

  def post
    @post ||= current_user.posts.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
