class UsersRequestsController < ApplicationController

  def update
    @user_request = UsersRequest.find_by(id: params[:id])
    if @user_request.update(users_request_params)
          redirect_to request.referrer
      else
          render request.referrer
    end

  end

  private

  def users_request_params
     params.require(:users_request).permit(:taken, :user_id, :request_id)
  end
end
