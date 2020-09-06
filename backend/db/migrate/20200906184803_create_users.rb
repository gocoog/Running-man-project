class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email_address
      t.string :password
      t.string :sprite_name

      t.timestamps
    end
  end
end
