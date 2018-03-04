class TaskResource < JSONAPI::Resource
  attributes :title, :description, :date, :duration

  belongs_to :user, always_include_linkage_data: true

  def self.records options = {}
    params = options[:context][:params]

    if params['action'] == 'index'
      Task
        .by_user_id(params[:user_id])
        .between_dates(params[:start_date], params[:end_date])
        .order(:date, :id)
    else
      Task
    end
  end
end
