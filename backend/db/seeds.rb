# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Score.destroy_all

tom = User.create(name: "Tom", email_address: "tom@mail.com", password: 'password', sprite_name: "mario")

will = User.create(name: "Will", email_address: "will@mail.com", password: 'password', sprite_name: "luigi")
angelo = User.create(name: "Angelo", email_address: "angelo@mail.com", password: 'password', sprite_name: "wario")

score1 = Score.create(score: 20, user_id: 1)
score2 = Score.create(score: 10, user_id: 2)
score3 = Score.create(score: 12, user_id: 3)
