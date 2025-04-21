class PostSerializer
  include JSONAPI::Serializer
  include Rails.application.routes.url_helpers

  attributes :title, :body, :status, :category_ids, :avatar, :creator_id, :published_at, :created_at, :updated_at

  attribute :creator do |post|
    post.creator.name
  end

  attribute :avatar_url do |post|
    post.avatar.attached? ? Rails.application.routes.url_helpers.url_for(post.avatar) : nil
  end
end
