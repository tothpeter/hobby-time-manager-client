import { moduleForComponent, test } from 'ember-qunit';
import Object from '@ember/object';

moduleForComponent('task-list', 'Unit | Component | task list', {
  needs: ['service:currentUser', 'service:session'],
  unit: true
});

test('groups the tasks', function(assert) {
  let component = this.subject(),
      tasks = Ember.A();

  let exampleTasks = [
    {
      date: new Date(2000, 1, 1),
      duration: 10
    },
    {
      date: new Date(2000, 1, 1),
      duration: 10
    },
    {
      date: new Date(2000, 1, 1),
      duration: 10
    },
    {
      date: new Date(3000, 1, 1),
      duration: 10
    },
    {
      date: new Date(3000, 1, 1),
      duration: 10
    }
  ];

  exampleTasks.forEach(function(task) {
    tasks.addObject(Object.create(task));
  });

  component.set('tasks', tasks);

  let currentUser = Object.create({
    user: {
      preferredWorkingHoursPerDay: 30
    }
  });

  component.set('currentUser', currentUser);

  let groups = component.get('groups');

  assert.deepEqual(groups[0].date, new Date(2000, 1, 1));
  assert.equal(groups[0].totalDuration, 30);
  assert.equal(groups[0].tasks.length, 3);
  assert.equal(groups[0].underPreferredWorkingHours, false);

  assert.deepEqual(groups[1].date, new Date(3000, 1, 1));
  assert.equal(groups[1].totalDuration, 20);
  assert.equal(groups[1].tasks.length, 2);
  assert.equal(groups[1].underPreferredWorkingHours, true);
});
