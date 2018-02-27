describe Me::TasksController, type: :controller do
  describe 'GET #index' do
    it "returns a list of tasks of the current user" do
      current_user = FactoryBot.create :user
      FactoryBot.create :task
      task = FactoryBot.create :task, user: current_user
      authenticate_request current_user

      get :index

      expect(json_response[:data][0][:id].to_i).to eq(task.id)
      expect(json_response[:data].length).to eq(1)
    end

    it "returns a 401 when the user is not authenticated" do
      get :index

      expect(response.code).to eq('401')
    end
  end
end
