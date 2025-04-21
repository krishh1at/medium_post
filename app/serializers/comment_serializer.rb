class CommentSerializer
  include JSONAPI::Serializer
  attributes :body, :parent_id, :commentor_id, :created_at, :updated_at

  attribute :commentor do |comment|
    comment.commentor.name
  end
end
