class Me::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.tasks.order(:date)
  end
end
