class Api::PresentationsController < ApplicationController

  def index
    render json: Presentation.all
  end

  def show
    render json: Presentation.find(params[:id])
  end

  def update
    presentation = Presentation.find(params[:id])
    presentation.title = params[:presentation]['title']
    presentation.save!
    render json: presentation
  end

end