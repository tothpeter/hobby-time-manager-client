module TasksControllerConcern
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
