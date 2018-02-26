class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      @user.confirm
      render json: @user, status: :created
    else
      respond_with_errors @user
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:data).require(:attributes).permit(:email, :password, :username, :first_name, :last_name)
    end
end
