class Me::TasksController < ApplicationController
  include TasksControllerConcern

  before_action :authenticate_user!
  before_action :validate_date_filter, only: [:index, :export]
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    tasks = current_user
      .tasks
      .between_dates(params[:start_date], params[:end_date])
      .order(:date, :id)

    render json: tasks
  end

  def show
    render json: @task
  end

  def create
    @task = current_user.tasks.new(task_params)

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

  def export
    tasks = current_user
      .tasks
      .between_dates(params[:start_date], params[:end_date])
      .order(:date, :id)

    date_range = "#{params[:start_date]} - #{params[:end_date]}"

    content = ExportService::Task.export tasks, date_range, current_user.preferred_working_hours_per_day

    render html: content.html_safe
  end

  def destroy
    @task.destroy
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:data).require(:attributes).permit(:title, :description, :date, :duration)
  end
end
