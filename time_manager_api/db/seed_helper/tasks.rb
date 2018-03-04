module SeedHelper::Tasks
  def self.create
    create_tasks tasks_params_for_me
    create_tasks tasks_params_for_others
  end

  private

  def self.create_tasks tasks_params
    tasks_params.each do |params|
      Task.create params
    end
  end

  def self.tasks_params_for_me
    result = []
    3.times do |i|
      result << {
        user_id: 1,
        title: "Test task##{i} yesterday",
        description: "Description of test task##{i}",
        date: Date.yesterday,
        duration: 1 # minutes
      }
    end

    4.times do |i|
      result << {
        user_id: 1,
        title: "Test task##{i} today",
        description: "Description of test task##{i}",
        date: Date.today,
        duration: 10 # minutes
      }
    end


    3.times do |i|
      result << {
        user_id: 1,
        title: "Test task##{i} tomorrow",
        description: "Description of test task##{i}",
        date: Date.today + 1,
        duration: 10 # minutes
      }
    end

    2.times do |i|
      result << {
        user_id: 1,
        title: "Test task##{i} yesterday",
        description: "Description of test task##{i}",
        date: Date.yesterday,
        duration: 10 # minutes
      }
    end

    result
  end


  def self.tasks_params_for_others
    result = []

    3.times do |i|
      result << {
        user_id: 2,
        title: "Test task##{i} for manager (yesterday)",
        description: "Description of test task##{i}",
        date: (Date.yesterday),
        duration: 1 # minutes
      }
    end

    3.times do |i|
      result << {
        user_id: 3,
        title: "Test task##{i} for employee (yesterday)",
        description: "Description of test task##{i}",
        date: (Date.yesterday),
        duration: 1 # minutes
      }
    end

    result
  end
end
