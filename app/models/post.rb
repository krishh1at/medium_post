class Post < ApplicationRecord
  belongs_to :creator, class_name: :User
  
  before_save :update_status, if: -> { status_changed? }

  enum :status, %i(draft published archived)

  validates :title, :body, :creator_id, presence: true

  private

  def update_status
    if draft?
      self.published_at = nil
    elsif published?
      self.published_at = Time.current
    end
  end
end
