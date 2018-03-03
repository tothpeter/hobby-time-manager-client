class TasksController < ApplicationController
  include TasksControllerConcern

  before_action :authenticate_user!
  before_action :validate_date_filter, only: :index
  before_action :set_task, only: [:show, :update, :destroy]

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

  def show
    render json: @task
  end

  def create
    @task = Task.new(task_params)

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

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:data).require(:attributes).permit(:title, :description, :date, :duration, :user_id)
  end
end
