require 'rails_helper'

RSpec.describe DevelopmentController, type: :controller do

  describe "GET #tasks_export" do
    it "returns http success" do
      get :tasks_export
      expect(response).to have_http_status(:success)
    end
  end

end
