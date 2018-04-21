import Component from '@ember/component';
import { observer } from '@ember/object';

export default Component.extend({
  init() {
    this._super(...arguments);

    this._translateDuration();
  },

  duration: 0,

  hours: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ],
  minutes: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59 ],

  selectedHour: 0,
  selectedMinute: 0,

  selectionChange: observer('selectedHour', 'selectedMinute', function() {
    let duration = this.selectedHour * 60 + this.selectedMinute * 1;

    this.get('update')(duration);
  }),

  durationChange: observer('duration', 'value', function() {
    this._translateDuration();
  }),

  _translateDuration() {
    let duration = this.value || this.duration;

    let hours   = Math.floor(duration / 60),
        minutes = duration % 60;

    this.setProperties({
      selectedHour: hours,
      selectedMinute: minutes
    });
  }
});
