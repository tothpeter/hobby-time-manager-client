describe Api::SessionsController, type: :controller do
  before do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe 'POST #create' do
    context 'when the credentials are valid' do
      it 'returns the expected json' do
        user = FactoryBot.create(:user)

        expect(Tiddle).to receive(:create_and_return_token).and_return('magic_token')

        post :create, params: { user: { email: user.email, password: user.password } }

        expect(json_response[:email]).to eq(user.email)
        expect(json_response[:token]).to eq('magic_token')
        expect(response.status).to eq(201)
      end
    end

    context 'when the credentials are invalid' do
      it 'returns 401' do
        post :create, params: { user: { email: '', password: '' } }

        expect(response.status).to eq(401)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'removes the session token' do
      current_user = FactoryBot.create(:user)

      authenticate_request current_user

      expect(current_user.authentication_tokens.count).to eq(1)

      delete :destroy

      expect(current_user.authentication_tokens.count).to eq(0)

      expect(response.status).to eq(204)
    end
  end
end
