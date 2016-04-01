Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get 'grab_totals', to: 'home#totals'
end
