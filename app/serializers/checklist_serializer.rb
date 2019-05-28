class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :item

  has_many :requests
  belongs_to :user
end
