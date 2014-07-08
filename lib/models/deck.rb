class Deck
  include Mongoid::Document

  has_many :cards

  def url
    "app#/deck/#{id.to_s}"
  end
end
