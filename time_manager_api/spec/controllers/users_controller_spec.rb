describe UsersController, type: :controller do

  describe "POST #create" do
    it "creates a new user and returns it" do
      request_params = {
        data: {
          attributes: {
            email: 'test@test.com',
            password: 123456,
            username: 'Username',
            first_name: 'First name',
            last_name: 'Last name',
            preferred_working_hours_per_day: 30,
          },

          type:"users"
        }
      }

      expect {
        post :create, params: request_params
      }.to change(User, :count).by(1)

      expect(json_response[:data][:email]).to eq(request_params[:data][:email])
      expect(response).to have_http_status(:created)
    end
  end

end
