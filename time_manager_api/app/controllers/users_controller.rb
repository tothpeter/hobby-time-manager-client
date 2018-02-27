class UsersController < ApplicationController
  before_action :authenticate_user!, except: :create
  before_action :set_user, only: [ :show, :update, :destroy, :password ]

  def me
    render json: current_user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @user.confirm
      render json: @user, status: :created
    else
      respond_with_errors @user
    end
  end

  def update
    if @user.update(user_params_for_update)
      render json: @user
    else
      respond_with_errors @user
    end
  end

  def password
    if @user.update(password_params)
      head 204
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

    def user_params_for_update
      params.require(:data).require(:attributes).permit(:username, :first_name, :last_name)
    end

    def password_params
      params.permit(:password)
    end
end
