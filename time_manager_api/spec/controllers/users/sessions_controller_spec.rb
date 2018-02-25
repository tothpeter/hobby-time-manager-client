describe Users::SessionsController, type: :controller do
  describe 'POST #create' do
    context 'when the credentials are valid' do
      it 'returns the expected json' do
        user = FactoryBot.create(:user)

        @request.env['devise.mapping'] = Devise.mappings[:user]

        expect(Tiddle).to receive(:create_and_return_token).and_return('magic_token')

        post :create, params: { user: { email: user.email, password: user.password } }

        expect(json_response[:email]).to eq(user.email)
        expect(json_response[:token]).to eq('magic_token')
        expect(response.status).to eq(201)
      end
    end

    context 'when the credentials are invalid' do
      it 'returns 401' do
        @request.env['devise.mapping'] = Devise.mappings[:user]

        post :create, params: { user: { email: '', password: '' } }

        expect(response.status).to eq(401)
      end
    end
  end
end
