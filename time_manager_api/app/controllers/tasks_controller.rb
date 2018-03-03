class TasksController < ApplicationController
  include TasksControllerConcern

  before_action :authenticate_user!
  before_action :validate_date_filter, only: [:index, :export]
  before_action :validate_user_filter, only: [:index, :export]
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    tasks = Task
      .by_user_id(params[:user_id])
      .between_dates(params[:start_date], params[:end_date])
      .order(:date, :id)

    render json: tasks
  end

  def show
    render json: @task
  end

  def create
    @task = Task.new(task_params)
    @task.user_id = params[:data][:relationships][:user][:data][:id]

    if @task.save
      render json: @task, status: :created
    else
      respond_with_errors @task
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      respond_with_errors @task
    end
  end

  def destroy
    @task.destroy
  end

  def export
    tasks = Task
      .by_user_id(params[:user_id])
      .between_dates(params[:start_date], params[:end_date])
      .order(:date, :id)

    date_range = "#{params[:start_date]} - #{params[:end_date]}"
    preferred_working_hours_per_day = User.find(params[:user_id]).preferred_working_hours_per_day

    content = ExportService::Task.export tasks, date_range, preferred_working_hours_per_day

    render html: content.html_safe
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:data).require(:attributes).permit(:title, :description, :date, :duration)
  end

  def validate_user_filter
    if params[:user_id].blank?
      return render json: {errors: ['user_id is required'] }, status: 422
    end
  end
end
