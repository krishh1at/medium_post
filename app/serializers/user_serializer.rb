class UserSerializer
  include JSONAPI::Serializer

  attributes :name, :email, :created_at, :updated_at

  has_many :posts, foreign_key: :creator_id
end
