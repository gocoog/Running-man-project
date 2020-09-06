class ScoresController < ApplicationController

    def index
        @scores = Score.all
        render json: @scores
    end

    def new
        @score = Score.new 
    end 

    def create
        @score = Score.new(score_params)
        if @score.save
            render json: @score
        else
            render json: { errors: @score.errors.full_messages }
        end
    end


    def destroy
        @score = Score.find_by(id: params[:id])
        @score.destroy
        render json: @scores
    end


    private
    def score_params
        params.require(:score).permit(:score, :user_id)
    end
    
end
