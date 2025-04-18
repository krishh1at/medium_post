class CommentSerializer
  include JSONAPI::Serializer
  attributes :body, :created_at, :updated_at

  attribute :commentor do |comment|
    comment.commentor.name
  end
end
