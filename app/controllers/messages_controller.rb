class MessagesController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.all
  end

  def create
      @message = Message.new(message_params)
      @message.save
      redirect_to action: :index
  end

  def message_params
    params.require(:message).permit(:text, :user_id)
  end
end
