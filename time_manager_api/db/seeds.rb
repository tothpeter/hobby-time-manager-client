# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'database_cleaner'
require_relative 'seed_helper'

DatabaseCleaner.clean_with(:truncation)

SeedHelper::Users.create
SeedHelper::Users.sign_in_my_user
SeedHelper::Tasks.create
