class ChecklistSerializer < ActiveModel::Serializer
  attributes :id

  has_many :requests
  belongs_to :user
end
