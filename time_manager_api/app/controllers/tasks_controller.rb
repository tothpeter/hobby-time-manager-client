class TasksController < ApplicationController
  include JSONAPI::ActsAsResourceController
  include TasksControllerConcern

  before_action :authenticate_user!
  before_action :validate_date_filter, only: [:index, :export]
  before_action :validate_user_filter, only: [:index, :export]

  def export
    user = User.find(params[:user_id])
    tasks = user
      .tasks
      .between_dates(params[:start_date], params[:end_date])
      .order(:date, :id)

    date_range = "#{params[:start_date]} - #{params[:end_date]}"

    content = ExportService::Task.export tasks, date_range, user

    render html: content.html_safe
  end

  private

  def validate_user_filter
    if params[:user_id].blank?
      return render json: {errors: ['user_id is required'] }, status: 422
    end
  end
end
