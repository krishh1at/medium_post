class Post < ApplicationRecord
  belongs_to :creator, class_name: :User
  has_one_attached :avatar

  has_many :post_categories, dependent: :destroy
  has_many :categories, through: :post_categories
  has_many :comments, dependent: :destroy

  enum :status, %i(draft published archived)

  validates :title, :body, :creator_id, presence: true

  before_save :update_status, if: ->{ status_changed? }

  scope :published, ->{ where(status: :published) }
  scope :latest,    ->{ order(published_at: :desc) }

  private

  def update_status
    if draft?
      self.published_at = nil
    elsif published?
      self.published_at = Time.current
    end
  end
end
