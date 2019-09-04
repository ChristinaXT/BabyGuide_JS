class UserRequestSerializer < ActiveModel::Serializer
  attributes :id, :taken

  belongs_to :user
  belongs_to :request
end
