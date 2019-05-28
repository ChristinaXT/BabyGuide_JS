class UserSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :checklists, serializer: ChecklistSerializer
  has_many :users_request, serializer: UsersRequestSerializer
  has_many :requests, through: :users_request
end
