Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get 'grab_totals', to: 'home#totals'
  get 'save_poop', to: 'home#save_poop'
end
