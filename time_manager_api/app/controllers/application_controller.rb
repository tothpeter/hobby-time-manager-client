class ApplicationController < ActionController::API
  include JSONAPI::ActsAsResourceController

  def context
    {
      current_user: current_user,
      params: params
    }
  end

  protected

  def respond_with_errors object
    render json: { errors: ErrorSerializer.serialize(object) }, status: :unprocessable_entity
  end

  def respond_with_custom_error title, status
    error = {
      errors: [
        {
          title:  title,
          status: status
        }
      ]
    }

    render json: error, status: status
  end

end
