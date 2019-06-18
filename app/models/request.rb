class Request < ApplicationRecord
  validates :item, presence: true

  has_many :users_request
  has_many :users, through: :users_request
  belongs_to :checklist

  def status
    finished ? 'Finished' : 'Unfinished'
  end

  def user_taken?(user)
    users_request.find {|user_request|user_request.user_id == user.id}.taken
  end

  def untaken_users
    users.select do |user|
      user_taken?(user) == false
    end
  end

  def finished_label
    finished ? 'Finished' : 'Update Status'
  end

  def finished_klass
    finished ? 'Text-success' : 'Text-danger'
  end

  scope :finished_requests, -> { Request.group('requests.id').where('finished')}
end
