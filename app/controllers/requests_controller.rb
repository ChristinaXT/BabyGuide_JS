class RequestsController < ApplicationController

  def new
    @request = Request.new(checklist_id: params[:checklist_id])
  end

  def create
    @request = Request.new(request_params)
      if @request.save
        redirect_to checklist_request_path(@request.checklist, @request)
      else
        render 'new'
      end
  end

  def show
    @request = Request.find_by(id: params[:id])
    @user_request = @request.users_request.find{|user_request|user_request.user_id == current_user.id}
  end

  def edit
     @request = Request.find_by(id: params[:id])
  end

  def update
    @request = Request.find_by(id: params[:id])
      if @request.update(request_params)
         redirect_to checklist_request_path(@request.checklist, @request)
      else
         render 'edit'
      end
  end

  def destroy
     request = Request.find_by(id: params[:id])
     @checklist = request.checklist
     request.destroy
     redirect_to checklist_path(@checklist)
  end

   private

  def request_params
      params.require(:request).permit(
        :item,
        :note,
        :checklist_id,
        :finished,
        user_ids: []
      )
  end
end
