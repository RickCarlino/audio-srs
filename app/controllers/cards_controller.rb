class CardsController < ApplicationController

  # def index
  # end

  # def create
  #   @deck = Deck.new()
  #   if @deck.save
  #     render action: :create
  #   else
  #     raise 'oops. Ill fix this later'
  #   end
  # end

  def index
    #I hate this. It's Restangular's fault.
    case params[:search]
    when 'due'
      @cards = Card.review_set(params[:deck_id])
    else
      @cards = Card.where(deck_id: params[:deck_id])
    end
    render json: @cards
  end

  def create
    @card = Card.create(card_params)
    render json: @card
  end

  def destroy
    if Card.find(params[:id]).destroy
      render nothing: true, status: 204
    else
      render nothing: true, status: 500 # TODO: Real errors
    end
  end

  def correct
    @card = Card.find(params[:card_id])
    @card.mark_correct!
    render json: @card
  end

  def incorrect
    @card = Card.find(params[:card_id])
    @card.mark_incorrect!
    render json: @card
  end

private
  def card_params
    params.permit(:card, [:question, :answer, :deck_id])
  end
end