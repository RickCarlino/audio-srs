require 'sinatra'
if development?
  require 'sinatra/reloader'
  require 'pry'
  require 'pry-nav'
end
require 'mongo'
require 'mongoid'

require_relative 'lib/models/deck'
require_relative 'lib/models/card'

configure do
  Mongoid.load!('mongoid.yml')
end











  before '/api/*' do
    content_type 'application/json'
  end

# ======= STATIC ========

  get '/' do
    File.open("index.html").readlines
  end

  get '/app' do
    File.open("app.html").readlines
  end

  get '/:dir/:file' do  
    send_file File.join(params[:dir], params[:file])
  end

  get '/favicon.ico' do
    ''
  end














# ======= API ===========

  post '/api/deck' do
    deck = Deck.create()
    if deck.errors.any?
      # body deck.to_json
      binding.pry
      status 400
    else
      body deck.as_json.merge(link: deck.url).to_json
      status 201
    end
  end

  # GET all of a decks cards
  get '/api/deck/:deck_id/cards' do
    deck = Deck.find(@params[:deck_id])
    cards = Card.where(deck: deck).all
    if cards
      body cards.to_json
      status 200
    else
      status 404
    end
  end

  # GET all cards dues for review (with distractors)
  get '/api/deck/:deck_id/cards/due' do
    questions = Card.review_set(@params[:deck_id])
    body questions.to_json
    status 200
  end

  # Create a card in a deck
  post '/api/deck/:deck_id/cards' do
    deck   = Deck.find(@params[:deck_id])
    params = JSON.parse(request.body.read.to_s).merge(deck_id: deck.id)
    card   = Card.create(params)
    unless card.errors.any?
      body card.to_json
      status 201
    else
      status 401
    end
  end

  # Mark item correct
  post '/api/deck/:deck_id/cards/due/:id/correct' do
    card = Card.find(@params['id'])
    card.mark_correct!
    status 200
    body card.to_json
  end

  # Mark item correct
  post '/api/deck/:deck_id/cards/due/:id/incorrect' do
    card = Card.find(@params['id'])
    card.mark_incorrect!
    status 200
    body card.to_json
  end

  # Remove a card from a deck
  delete '/api/deck/:deck_id/cards/:id' do
    Card.where(deck_id: @params['deck_id']).find(params[:id]).destroy
    status 204
  end
