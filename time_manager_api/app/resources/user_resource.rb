class UserResource < JSONAPI::Resource
  attributes :email, :username, :first_name, :last_name, :preferred_working_hours_per_day
end