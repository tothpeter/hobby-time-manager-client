class ApplicationController < ActionController::API
  include JSONAPI::ActsAsResourceController

  def context
    {
      current_user: current_user,
      params: params
    }
  end

  def respond_with_errors object
    render json: { errors: ErrorSerializer.serialize(object) }, status: :unprocessable_entity
  end
end
