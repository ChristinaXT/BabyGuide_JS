class ChecklistsController < ApplicationController
  before_action :authorized_to_edit?, only: [:edit, :update]
  before_action :set_checklist, only: [:show, :edit, :update, :destroy]

  def index
    #@checklists = Checklist.all
    @checklists = Checklist.search(params[:search])
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @checklists}
    end
  end

  def new
    @checklist = Checklist.new(user_id: current_user.id)
  end

  def create #JSON rep of the checklist can be used without page refresh or redirect
    @checklist = Checklist.new(checklist_params)
      if @checklist.save
        respond_to do |f|
          f.html {redirect_to user_checklist_path(current_user, @checklist)}
          f.json {render json: @checklist}
      end
    else
        #flash[:notice] = "Your checklist creation was unsuccessful"
        render 'new'
      end
  end

  def show
    @checklist = Checklist.find_by(id: params[:id])
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @checklist}
    end
  end

  def edit
    @checklist = Checklist.find_by(id: params[:id])
  end

  def update
   @checklist = Checklist.find_by(id: params[:id])
    if @checklist.update(checklist_params)
        respond_to do |f|
          f.html {redirect_to checklist_path(@checklist)}
          f.json {render json: @checklist}
      end
   else
       #flash[:notice] = "Something went wrong, please try again"
       render 'edit'
    end
  end

  def destroy
    @checklist = Checklist.find_by(id: params[:id])
    @checklist.destroy
    redirect_to user_path(current_user)
  end


    private

  def set_checklist
    @checklist = Checklist.find_by_id(params[:id])
  end

  def checklist_params
    params.require(:checklist).permit(:item, :user_id, :requests_attributes => {})
  end
end
