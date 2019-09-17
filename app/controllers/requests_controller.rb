class RequestsController < ApplicationController

  #scope method
  def finished_requests
    @requests = current_user.requests.finished_requests
  end

  def unfinished_requests
    @requests = current_user.requests.unfinished_requests
  end

  def new
    #@checklist = Checklist.find(params[:checklist_id])
    @request = Request.new(checklist_id: params[:checklist_id])
  end

  def show
    @request = Checklist.find(params[:checklist_id]).requests.find(params[:id])
    @user_request = @request.users_request.find{|user_request|user_request.user_id == current_user.id}
    #respond_to do |format|
        #format.html {render :show}
        #format.json {render json: @request}
      #end
  end

  def create
    @request = Request.create(request_params)
        if @request.save
            respond_to do |format|
                format.html {redirect_to checklist_request_path(@request.checklist, @request)}
                format.json {render json: @request}
            end
        else
            render 'new'
        end
  end

  def edit
     @request = Request.find_by(id: params[:id])
  end

  def update
    @request = Request.find_by(id: params[:id])
      if @request.update(request_params)
        respond_to do |format|
          format.html {redirect_to checklist_request_path(@request.checklist, @request)}
          format.json {render json: @request}
        end
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
      params.require(:request).permit(:item, :note, :checklist_id, :finished, user_id: [])
  end
end
