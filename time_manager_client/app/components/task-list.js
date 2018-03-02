import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['task-list'],
  preferredWorkingHoursPerDay: 40,

  groups: computed('tasks.[]', function() {
    let groups = [],
        currentGroup,
        currentDate;

    this.get('tasks').forEach((task) => {
      if (!currentDate || currentDate.valueOf() !== task.get('date').valueOf()) {
        currentDate = task.get('date');

        currentGroup = groups.pushObject({
          date: currentDate,
          underPreferredWorkingHours: true,
          totalDuration: 0,
          tasks: []
        });
      }

      currentGroup.totalDuration += task.get('duration');
      currentGroup.tasks.pushObject(task);
    });

    groups.forEach((group) => {
      group.underPreferredWorkingHours = group.totalDuration < this.preferredWorkingHoursPerDay;
    });

    return groups;
  })
});
