class HomeController < ApplicationController

  def index
  end

  def totals
    render(json: {total_money: TotalPoop.last.total_money, total_time: TotalPoop.last.total_time})
  end

end
