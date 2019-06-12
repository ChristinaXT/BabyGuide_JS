class ChecklistsController < ApplicationController
  before_action :authorized_to_edit?, only: [:edit, :update]
  before_action :set_checklists, only: [:show, :edit, :update, :destroy]

  def index
    @checklists = Checklist.all
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @checklists}
    end
  end

  def new
    @checklist = Checklist.new(user_id: current_user.id)
  end

  def create #JSON rep of the checklist can be used without page refresh or redirect
    @checklist = Checklist.new(checklist_params)
      if @checklist.save
        render json: @checklist
         #redirect_to user_checklist_path(current_user, @checklist)
    else
        flash[:notice] = "Your checklist creation was unsuccessful"
        render 'new'
      end
  end

  #scope method
  def users_with_most_requests
    @checklists = Checklist.users_with_most_requests
  end

  def show
    #@checklist = Checklist.find_by(id: params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @checklist}
      end
  end

  def edit
   @checklist = Checklist.find_by(id: params[:id])
  end

  def update
   @checklist = Checklist.find_by(id: params[:id])
    if @checklist.update(checklist_params)
      redirect_to checklist_path(@checklist)
   else
       flash[:notice] = "Something went wrong, please try again"
       render 'edit'
    end
  end

  def destroy
    checklist = Checklist.find_by(id: params[:id])
    checklist.destroy
    redirect_to user_path(current_user)
  end


    private

  def set_checklists
    @checklist = Checklist.find(params[:id])
  end

  def checklist_params
    params.require(:checklist).permit(
      :item,
      :user_id
    )
  end
end
