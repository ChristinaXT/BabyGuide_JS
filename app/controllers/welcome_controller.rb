class WelcomeController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:home]
  def home
  end
  #def index
    #@comments = Comment.all
  #end
end
