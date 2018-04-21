import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['task-list'],
  currentUser: service(),
  router: service(),
  me: true,

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

    let preferredWorkingHoursPerDay = this.get('currentUser.user.preferredWorkingHoursPerDay');

    groups.forEach((group) => {
      group.underPreferredWorkingHours = group.totalDuration < preferredWorkingHoursPerDay;
    });

    return groups;
  }),

  actions: {
    deleteTask(task) {
      if (window.confirm('Are you sure, you want to delete this task?')) {
        task.destroyRecord(this._adapterParams());
      }
    },

    navigateToTaskShow(event) {
      let target = $(event.target);

      if (target.parents('th').length) {
        return;
      }

      let taskRow = target.parents('.task-item');

      if (taskRow.length) {
        let userId = taskRow.data('user-id'),
            taskId = taskRow.data('task-id');

        if (this.get('me')) {
          this.get('router').transitionTo('dashboard.me.tasks.task', taskId);
        } else {
          this.get('router').transitionTo('dashboard.users.user.tasks.task', userId, taskId);
        }
      }
    }
  },

  _adapterParams: function() {
    if (this.get('me')) {
      return {
        adapterOptions: {
          me: true
        }
      };
    } else {
      return {};
    }
  }
});
