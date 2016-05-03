class HomeController < ApplicationController

  def index
  end

  def totals
    render(json: {total_money: TotalPoop.last.total_money, total_time: TotalPoop.last.total_time})
  end

  def save_poop
    @poop = Pooped.new(poop_params)
    if @poop.save
      render(json: :ok)
    else
      render :json => { :errors => @poop.errors.full_messages }
    end
  end

  private

  def poop_params
    params.require(:pooped).permit(:user_id, :wage, :money_earned, :time_wasted)
  end

end
