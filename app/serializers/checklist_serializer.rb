class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :item, :user_id

  has_many :requests
  belongs_to :user

  #def item
    #checklist = object.checklist
    #checklist.item
#  end

end
