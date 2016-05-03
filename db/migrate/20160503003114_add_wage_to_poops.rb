class AddWageToPoops < ActiveRecord::Migration
  def change
    add_column :poopeds, :wage, :float
  end
end
