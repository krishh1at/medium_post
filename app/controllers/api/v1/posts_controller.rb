class Api::V1::PostsController < Api::V1::ApplicationController
  def index
    posts = Post.published.latest.with_attached_avatar.includes(:creator).page(params[:page])
    render json: PostSerializer.new(posts).serializable_hash
  end

  def show
    render json: PostSerializer.new(post).serializable_hash
  end

  private

  def post
    @post ||= Post.find(params[:id])
  end
end
