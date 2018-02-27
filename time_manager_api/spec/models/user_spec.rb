describe User, type: :model do
  describe 'Validations' do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password) }
  end

  describe 'Associations' do
    it { is_expected.to have_many(:authentication_tokens).dependent(:delete_all) }
    it { is_expected.to have_many(:tasks).dependent(:delete_all) }
  end
end
