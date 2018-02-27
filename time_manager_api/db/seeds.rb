# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user = User.first

Task.destroy_all

3.times do |i|
  task_params = {
    user: user,
    title: "Test task##{i} yesterday",
    description: "Description of test task##{i}",
    date: (Date.yesterday),
    duration: 10 # minutes
  }

  Task.create task_params
end

4.times do |i|
  task_params = {
    user: user,
    title: "Test task##{i} today",
    description: "Description of test task##{i}",
    date: Date.today,
    duration: 10 # minutes
  }

  Task.create task_params
end


3.times do |i|
  task_params = {
    user: user,
    title: "Test task##{i} tomorrow",
    description: "Description of test task##{i}",
    date: (Date.tomorrow),
    duration: 10 # minutes
  }

  Task.create task_params
end

2.times do |i|
  task_params = {
    user: user,
    title: "Test task##{i} yesterday",
    description: "Description of test task##{i}",
    date: (Date.yesterday),
    duration: 10 # minutes
  }

  Task.create task_params
end
