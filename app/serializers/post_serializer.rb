class PostSerializer
  include JSONAPI::Serializer

  attributes :title, :body, :status, :published_at, :created_at, :updated_at

  attribute :creator do |post|
    post.creator.name
  end
end
