class ChecklistSerializer < ActiveModel::Serializer
  attributes :id, :item

  has_many :requests, serializer: RequestSerializer
  belongs_to :user

  #def checklist_finished?
    #object.checklist_finished?
  #end
end
