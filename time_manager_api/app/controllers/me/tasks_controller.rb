class Me::TasksController < ApplicationController
  include JSONAPI::ActsAsResourceController
  include TasksControllerConcern

  before_action :authenticate_user!
  before_action :validate_date_filter, only: [:index, :export]

  def export
    tasks = current_user
      .tasks
      .between_dates(params[:start_date], params[:end_date])
      .order(:date, :id)

    date_range = "#{params[:start_date]} - #{params[:end_date]}"

    content = ExportService::Task.export tasks, date_range, current_user.preferred_working_hours_per_day

    render html: content.html_safe
  end
end
