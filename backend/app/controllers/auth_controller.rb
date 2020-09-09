class AuthController < ApplicationController
  
    def login
      @user = User.find_by(email_address: login_params[:email_address])
      
      if @user && @user.password == login_params[:password]

        render json: @user
      else
        render json: {error: "User not found"}
      end
    end

    private
    def login_params
      params.require(:login).permit(:email_address, :password)
    end
  
  end