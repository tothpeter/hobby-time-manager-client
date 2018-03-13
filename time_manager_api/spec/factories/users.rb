FactoryBot.define do
  factory :user do
    username     { 'User name' }
    email        { Faker::Internet.email }
    password     { 123456 }
    confirmed_at { Time.now }
  end
end
