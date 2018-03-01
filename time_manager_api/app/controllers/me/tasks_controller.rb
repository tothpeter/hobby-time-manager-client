class Me::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    if params[:start_date].blank? || params[:end_date].blank?
      return render json: { errors: ['start_date or end_date is missing'] }, status: 422
    end

    tasks = current_user
      .tasks
      .between_dates(params[:start_date], params[:end_date])
      .order(:date)

    render json: tasks
  end

  def export
    tasks = current_user
      .tasks
      .between_dates(params[:start_date], params[:end_date])
      .order(:date)

    date_range = "#{params[:start_date]} - #{params[:end_date]}"

    # TODO: Use real expected_working_time
    content = ExportService::Task.export tasks, date_range, 40

    render html: content.html_safe
  end
end
