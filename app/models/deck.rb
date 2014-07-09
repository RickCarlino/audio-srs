class Deck
  include Mongoid::Document

  has_many :cards

  def url
    "dashboard?token=#{id.to_s}#/deck/#{id.to_s}"
  end
end
