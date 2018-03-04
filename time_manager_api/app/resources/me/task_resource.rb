class Me::TaskResource < TaskResource
  def self.records options = {}
    params = options[:context][:params]
    scope = options[:context][:current_user].tasks

    if params[:start_date].present?
      scope = scope.between_dates(params[:start_date], params[:end_date])
    end

    scope
  end

  before_save do
    @model.user_id = context[:current_user].id
  end

  def self.resource_for type
    if type.downcase.include? 'user'
      UserResource
    else
      super type
    end
  end
end
