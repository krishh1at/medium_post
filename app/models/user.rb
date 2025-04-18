class User < ApplicationRecord
  has_secure_password

  enum :role, %i(user creator)

  validates :email, presence: true, uniqueness: true

  has_many :posts, foreign_key: :creator_id
end
