import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['task-list'],
  preferredWorkingHoursPerDay: 40,

  groupedTasks: computed('tasks', function() {
    let result = [],
        currentIndex = -1,
        currentDate = null;

    this.get('tasks').forEach((task) => {
      if (!currentDate || currentDate.valueOf() != task.get('date').valueOf()) {
        if (currentDate) {
          result[currentIndex].underPreferredWorkingHours = result[currentIndex].totalDuration < this.preferredWorkingHoursPerDay;
        }

        currentIndex++;
        currentDate = task.get('date');

        result.pushObject({
          date: task.get('date'),
          underPreferredWorkingHours: true,
          totalDuration: 0,
          tasks: []
        });
      }

      result[currentIndex].totalDuration += task.get('duration');
      result[currentIndex].tasks.pushObject(task);
     });

     return result;
  })
});
