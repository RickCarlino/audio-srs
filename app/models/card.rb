require 'thinking_lobster'
class Card
  include Mongoid::Document
  include ThinkingLobster

  belongs_to :deck

  field :question
  field :answer

  # Find latest 25 cards due for a particular deck
  def self.due(deck_id)
    self.where(:review_due_at.lte => Time.now, deck_id: deck_id).limit(25)
  end

  # Takes all the cards that are due (as Ruby Hashes), adds a 'choices' field
  # and then returns the shuffled cards.
  def self.review_set(deck_id)
    cards = due(deck_id).as_json
    cards.map do |card|
      card["choices"] = []
      times = 0
      until card["choices"].length == 3
        times += 1
        break if times > 20 # Just in case.
        distractor = possible_quiz_answers(deck_id).sample
        unless (distractor == card["answer"]) ||
               (card["choices"].include?(distractor))
          card["choices"] << distractor
        end
      end
      card["choices"] << card["answer"]
      card["choices"].shuffle!
      card
    end
    cards.shuffle!
  end

  def self.possible_quiz_answers(deck_id)
    unless @answers
      @answers = where(deck_id: deck_id).pluck(:answer).shuffle
      if @answers.length < 5
        @answers << "thinking" << "lobster" << "srs" << "is" << "great" << "for" <<
                   "many" << "reasons"
      end
    end
    return @answers.shuffle
  end
end
