class RequestSerializer < ActiveModel::Serializer
  attributes :id, :item, :note

  has_many :users_request
  has_many :users, through: :users_request
  belongs_to :checklist
end
