class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :item

  has_many :requests
  belongs_to :user

  #def item
    #checklist = object.checklist
    #checklist.item
#  end

end
