class UserSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :checklists
  has_many :users_request
  has_many :requests, through: :users_request
end
