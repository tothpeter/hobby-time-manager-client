class Me::TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :validate_date_filter, only: [:index, :export]

  def index
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

  private

  def validate_date_filter
    if params[:start_date].blank? || params[:end_date].blank?
      return render json: { errors: ['start_date or end_date is missing'] }, status: 422
    end

    begin
      start_date = Date.parse(params[:start_date])
      end_date = Date.parse(params[:end_date])
    rescue
      return render json: { errors: ['invalid start or end date'] }, status: 422
    end

    if (end_date - start_date) > 92
      return render json: { errors: ['the max time gap between start_date and end_date is 3 months'] }, status: 422
    end
  end
end
