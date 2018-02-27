module AuthHelpers
  def authenticate_request user
    token = Tiddle.create_and_return_token(user, request)

    auth_headers = {
      'X-USER-TOKEN': token,
      'X-USER-EMAIL': user.email
    }

    request.headers.merge! auth_headers
  end
end
