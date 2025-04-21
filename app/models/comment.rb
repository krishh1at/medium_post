class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :commentor, class_name: :User
  belongs_to :parent, class_name: :Comment, optional: true
  has_many :childrens, class_name: :Comment, foreign_key: :parent_id, dependent: :destroy
end
