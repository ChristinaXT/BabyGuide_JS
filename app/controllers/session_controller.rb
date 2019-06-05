class SessionController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

  def new

  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      user = User.find_or_create_by_omniauth(auth_hash)
      session_login(user)

    elsif @user = User.find_by(email: params[:email])
      if @user.authenticate(params[:password])
         session_login(@user)
      else
        flash[:message] = "That password is incorrect"
        render controller: 'users', action: 'new'
      end
    else
     flash[:message] = "Incorrect Email and/or Password!"
     render controller: 'users', action: 'new'
    end
  end

  def destroy
    session.delete :user_id
    redirect_to root_path
  end
end
