FactoryBot.define do
  factory :user do
    username     { 'User name' }
    email        { 'test@test.com' }
    password     { 123456 }
    confirmed_at { Time.now }
  end
end
