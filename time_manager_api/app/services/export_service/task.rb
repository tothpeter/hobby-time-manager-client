module ExportService
  class Task
    def self.export tasks, date_range
      groups = group_tasks tasks

      template = File.read 'app/views/exports/tasks.html.erb'

      ERB.new(template, 0, '', '@html').result(binding)
    end

    private

    def self.group_tasks tasks
      groups = []

      tasks.group_by(&:date).each do |date, grouped_tasks|
        groups << create_group(date, grouped_tasks)
      end

      groups
    end

    def self.create_group date, tasks
      OpenStruct.new({
        date: date,
        total_time: format_time(tasks.inject(0){|sum, t| sum + t.duration }),
        tasks: tasks
      })
    end

    def self.format_time minutes
      hours, minutes = minutes.divmod 60

      result = ''

      result += "#{hours}h" if hours > 0
      result += " #{minutes}m" if minutes > 0

      result
    end
  end
end
