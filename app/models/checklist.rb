class Checklist < ApplicationRecord
    validates :item, presence: true

    has_many :requests
    belongs_to :user

    def checklist_finished?
        !requests.any?{|request| request.status == "Unfinished"}
    end

    accepts_nested_attributes_for :requests

    def self.search(search)
      if search
          where('item LIKE ?', "%#{search}%")
        else
         Checklist.all
      end
    end



end
