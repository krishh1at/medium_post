class Api::V1::CommentsController < Api::V1::ApplicationController
  def index
    comments = post.comments.page(params[:page])

    render json: CommentSerializer.new(comments).serializable_hash
  end

  def show
    render json: CommentSerializer.new(comment).serializable_hash
  end

  def create
    comment = post.comments.build(comment_params)

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
    @post ||= current_user.posts.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
