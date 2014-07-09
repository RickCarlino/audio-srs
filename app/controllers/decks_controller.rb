class DecksController < ApplicationController

  # def index
  # end

  def create
    @deck = Deck.new()
    if @deck.save
      render action: :create
    else
      raise 'oops. Ill fix this later'
    end
  end

  def show
    @deck = Deck.find(params[:id])
    render json: @deck
  end

end