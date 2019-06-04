class RequestSerializer < ActiveModel::Serializer
  attributes :id, :item, :note, :status

  has_many :users_request
  has_many :users, through: :users_request
  belongs_to :checklist

  #def status
    #object.status
  #end

  #def user_taken?
    #object.user_taken?
  #end

  #def untaken_users
    #object.untaken_users
  #end

  #def finished_label
    #object.finished_label
  #end

  #def finished_klass
    #object.finished_klass
  #end
end
