describe '/users endpoint', type: :request do
  describe "POST #create" do
    it "creates a new user and returns it" do
      request_payload = {
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
        post '/users', params: request_payload
      }.to change(User, :count).by(1)

      expect(json_response[:data][:email]).to eq(request_payload[:data][:email])
      expect(response).to have_http_status(:created)
    end
  end

  describe "PATCH #update" do
    context "when the current user updates himself" do
      it "updates the user and returns it" do
        request_payload  = request_payload_for_user current_user
        updated_username = request_payload[:data][:attributes][:username] += 'Update1'

        request_arguments = {
          headers: auth_headers,
          params: request_payload
        }

        patch "/users/#{current_user.id}", request_arguments

        expect(response.code).to eq('200')
        expect(json_response[:data][:attributes][:username]).to eq(updated_username)
      end
    end

    context "when the current user updates an another user" do
      context "when the current user has the right" do
        it "updates the user and returns it" do
          current_user.admin!
          other_user = FactoryBot.create :user
          request_payload  = request_payload_for_user other_user
          updated_username = request_payload[:data][:attributes][:username] += 'Update1'

          request_arguments = {
            headers: auth_headers,
            params: request_payload
          }

          patch "/users/#{other_user.id}", request_arguments

          expect(response.code).to eq('200')
          expect(json_response[:data][:attributes][:username]).to eq(updated_username)
        end
      end

      context "when the current user does not have the right" do
        before do
          @other_user = FactoryBot.create :user
          request_payload   = request_payload_for_user @other_user
          @updated_username = request_payload[:data][:attributes][:username] += 'Update1'

          request_arguments = {
            headers: auth_headers,
            params: request_payload
          }

          patch "/users/#{@other_user.id}", request_arguments
        end

        it "won't update the user" do
          @other_user.reload
          expect(@other_user.username).not_to eq(@updated_username)
        end

        it "returns 403" do
          expect(response.code).to eq('403')
        end
      end
    end
  end

  def request_payload_for_user user
    {
      data: {
        id: user.id,
        attributes: {
          email: user.email,
          username: user.username,
          "first-name": user.first_name,
          "last-name": user.last_name,
          "preferred-working-hours-per-day": user.preferred_working_hours_per_day
        },

        type: "users"
      }
    }
  end
end
