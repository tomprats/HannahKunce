class Item < ActiveRecord::Base
  belongs_to :group

  validates_presence_of :name, :price, :image, :description

  mount_uploader :image, ItemImageUploader
end
