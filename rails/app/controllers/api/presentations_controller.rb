class Api::PresentationsController < ApplicationController

  def index
    render json: Presentation.all
  end

end