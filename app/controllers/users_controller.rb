class UsersController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

   def new
      @user = User.new
   end

   def create
      @user = User.new(user_params)
      if @user.save
        flash[:success] = "Hi there!"
        session[:user_id] = @user.id
         session_login(@user)
       else
          render 'new'
      end
   end

   #scope method
   def users_with_most_requests
     @users = User.users_with_most_requests
   end

    def show
      @user = User.find_by_id(params[:id])
      @untaken_user_requests = UsersRequest.untaken_by_user(@user)
      #respond_to do |format|
        #format.html {render :show}
        #format.json {render json: @user}
    #  end
    end

    #def edit
      #@user = User.find_by_id(params[:id])
    #  respond_to do |format|
      #  format.html {render :edit}
      #  format.json {render json: @user}
    #  end
    #end

    #def update
    #  @user = User.find_by(id: params[:id])
    #  if @user.update(user_params)
         #respond_to do |format|
          # format.html {redirect_to user_path(@user)}
           #format.json {render json: @user}
         #end
    #  else
      #    render 'edit'
    #  end
    #end


    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, request_ids: [])
    end
end
