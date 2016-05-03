class CreatePoopeds < ActiveRecord::Migration
  def change
    create_table :poopeds do |t|
      t.float :money_earned
      t.float :time_wasted
      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
