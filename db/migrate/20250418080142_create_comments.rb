class CreateComments < ActiveRecord::Migration[8.0]
  def change
    create_table :comments do |t|
      t.string :body
      t.references :post, null: false, foreign_key: true
      t.references :commentor, null: false, foreign_key: { to_table: :users }
      t.references :parent

      t.timestamps
    end
  end
end
