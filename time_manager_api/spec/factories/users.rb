FactoryBot.define do
  factory :user do
    email        { 'test@test.com' }
    password     { 123456 }
    confirmed_at { Time.now }
  end
end
