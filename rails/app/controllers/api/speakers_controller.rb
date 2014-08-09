class Api::SpeakersController < ApplicationController
  def index
    render json: Speaker.all
  end

  def show
    render json: Speaker.find(params[:id])
  end

  def update
    speaker = Speaker.find(params[:id])
    speaker.name = params[:name]
    speaker.save!
  end

end
