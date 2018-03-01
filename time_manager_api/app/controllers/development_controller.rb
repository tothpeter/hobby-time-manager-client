class DevelopmentController < ActionController::Base
  before_action :protect

  def tasks_export
    tasks = Task.order(:date).limit(30)
    date_range = "2018-03-01 - 2018-04-01"
    expected_working_time = 40

    content = ExportService::Task.export(tasks, date_range, expected_working_time)

    render html: content.html_safe
  end

  private

  def protect
    head 404 unless Rails.env.development?
  end
end
