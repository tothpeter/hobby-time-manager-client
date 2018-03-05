class TasksController < ApplicationController
  include JSONAPI::ActsAsResourceController
  include TasksControllerConcern

  load_and_authorize_resource

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
      respond_with_custom_error 'user_id is required', 422
    end
  end
end
