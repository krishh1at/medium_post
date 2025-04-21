class Api::V1::CommentsController < Api::V1::ApplicationController
  before_action :can_delete?, on: :destroy

  def index
    comments = post.comments.includes(:commentor).page(params[:page])
    render json: CommentSerializer.new(comments).serializable_hash
  end

  def show
    render json: CommentSerializer.new(comment).serializable_hash
  end

  def create
    comment = post.comments.build(comment_params)
    comment.commentor = current_user

    if comment.save
      render json: CommentSerializer.new(comment).serializable_hash
    else
      render json: { errors: comment.errors.full_messages }
    end
  end

  def update
    if comment.update(comment_params)
      render json: CommentSerializer.new(comment).serializable_hash
    else
      render json: { errors: post.errors.full_messages }
    end
  end

  def destroy
    if comment.destroy
      render json: { success: "deleted successfully." }
    else
      render json: { errors: "not deleted." }
    end
  end

  private

  def comment
    @comment ||= post.comments.find(params[:id])
  end

  def post
    @post ||= Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:body, :parent_id)
  end

  def can_delete?
    return if post.creator_id == current_user.id  || comment.commentor_id == current_user.id

    render json: { errors: "permission denied" }, status: :forbidden
  end
end
