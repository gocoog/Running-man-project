class AuthController < ApplicationController

    def login
      render :login
    end
  
    def verify
      @user = User.find_by(email_address: login_params[:email_address])
      byebug;
      if @user && @user.password == login_params[:password]

        render json: @user
      else
        flash[:error] = 'Login failed..'
        render json: login
      end
    end
  
    def logout
      session[:user_id] = nil
      render json: login
    end
  
    private
    def login_params
      params.require(:login).permit(:email_address, :password)
    end
  
  end