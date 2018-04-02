class MessagesController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.all
    #render json: @messages

    respond_to do |format|
      format.html
      format.json { render :json => @messages }
    end
    #format.json {render json: @messages, :status => created}

    # render json: @messages, status: :created, location: @message
  end

  def create
    @message = Message.create(message_params)
    respond_to do |format|
      format.html
      format.json { render :json => @messages }
    end
  end



  def message_params
    params.require(:message).permit(:user_id, :text)
  end
end
