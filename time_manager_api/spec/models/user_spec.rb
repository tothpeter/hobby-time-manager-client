describe User, type: :model do
  describe 'Associations' do
    it { is_expected.to have_many(:tasks).dependent(:delete_all) }
  end
end
