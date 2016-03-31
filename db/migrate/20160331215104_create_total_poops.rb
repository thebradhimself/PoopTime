class CreateTotalPoops < ActiveRecord::Migration
  def change
    create_table :total_poops do |t|
      t.decimal :total_money
      t.decimal :total_time
      
      t.timestamps null: false
    end
  end
end
