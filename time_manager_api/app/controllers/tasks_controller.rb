class TasksController < ApplicationController
  include TasksControllerConcern

  before_action :authenticate_user!
  before_action :validate_date_filter, only: :index

  def index
    if params[:user_id].blank?
      return render json: {errors: ['user_id is required'] }, status: 422
    end

    tasks = Task
      .by_user_id(params[:user_id])
      .between_dates(params[:start_date], params[:end_date])
      .order(:date, :id)

    render json: tasks
  end
end
