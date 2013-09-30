class Api::PhotoTaggingsController < ApplicationController
  before_filter :require_current_user!, only: :create
  before_filter :user_owns_photo!, only: :create
  
  def create
    @photo_tagging = PhotoTagging.new(params[:photo_tagging])
    if @photo_tagging.save
      render json: @photo_tagging
    else
      render(
      json: @photo_tagging.errors.full_messages,
      status: :unprocessable_entity
    )
    end
  end
  
  def index 
    @photo_taggings = 
      PhotoTaggging.where("photo_id = ?", params[:photo_id])
      
    render json: @photo_taggings
  end
  
  private
  def user_owns_photo!
    unless current_user.id == Photo.find(params[:photo_tagging])
      redirect_to user_url(current_user)
    end
  end
end
