describe '/me/tasks' do

  describe "#validate_date_filter" do
    context "when the start date filter is missing" do
      it "returns a 422" do
        request_arguments = {
          headers: auth_headers,
          params: { start_date: 1 }
        }

        get '/me/tasks', request_arguments

        expect(json_response[:errors][0][:title]).to include('missing')
        expect(response.code).to eq('422')
      end
    end

    context "when the end date filter is missing" do
      it "returns a 422" do
        request_arguments = {
          headers: auth_headers,
          params: { end_date: 1 }
        }

        get '/me/tasks', request_arguments

        expect(json_response[:errors][0][:title]).to include('missing')
        expect(response.code).to eq('422')
      end
    end

    context "when the time gap between start and end date is bigger than 3 months" do
      it "returns a 422" do
        request_arguments = {
          headers: auth_headers,
          params: {
            start_date: '2000-12-01',
            end_date: '2001-03-04'
          }
        }

        get '/me/tasks', request_arguments

        expect(json_response[:errors][0][:title]).to include('months')
        expect(response.code).to eq('422')
      end
    end

    context "when the params contain something funny" do
      it "returns a 422" do
        request_arguments = {
          headers: auth_headers,
          params: {
            start_date: 'hack',
            end_date: 'malicious content'
          }
        }

        get '/me/tasks', request_arguments

        expect(json_response[:errors][0][:title]).to include('invalid')
        expect(response.code).to eq('422')
      end
    end

    context "when the params are good" do
      it "returns a 422" do
        request_arguments = {
          headers: auth_headers,
          params: {
            start_date: '2000-01-01',
            end_date: '2000-04-01'
          }
        }

        get '/me/tasks', request_arguments

        expect(response.code).to eq('200')
      end
    end
  end

  describe "GET #index" do
    it "returns the tasks of the current user only" do
      FactoryBot.create :task
      task = FactoryBot.create :task, user: current_user

      request_arguments = {
        headers: auth_headers,
        params: {
          start_date: task.date,
          end_date: task.date
        }
      }

      get '/me/tasks', request_arguments

      expect(json_response[:data][0][:id].to_i).to eq(task.id)
      expect(json_response[:data].length).to eq(1)
    end

    it "returns a 401 when the user is not authenticated" do
      get '/me/tasks'

      expect(response.code).to eq('401')
    end
  end
end
