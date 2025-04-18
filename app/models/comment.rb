class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :commentor, class_name: :User
  belongs_to :parent
end
