# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user = User.first

User.where('id > ?', user.id).destroy_all
Task.destroy_all

user_test1 = User.create email: 'a@a.a', password: 123123, confirmed_at: Time.now, preferred_working_hours_per_day: 10, username: 'test user 1'


3.times do |i|
  task_params = {
    user: user,
    title: "Test task##{i} yesterday",
    description: "Description of test task##{i}",
    date: (Date.yesterday),
    duration: 1 # minutes
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
    date: (Date.today + 1),
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



3.times do |i|
  task_params = {
    user: user_test1,
    title: "Test task##{i} yesterday",
    description: "Description of test task##{i}",
    date: (Date.yesterday),
    duration: 1 # minutes
  }

  Task.create task_params
end
