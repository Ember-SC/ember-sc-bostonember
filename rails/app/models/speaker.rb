class Speaker < ActiveRecord::Base
  has_many :presentations, :dependent => :destroy
end
