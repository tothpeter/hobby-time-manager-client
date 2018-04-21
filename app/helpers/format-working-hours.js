import { helper } from '@ember/component/helper';

export function formatWorkingHours(duration) {
  let hours   = Math.floor(duration / 60),
      minutes = duration % 60;

  let result = [];

  if (hours > 0) {
    result.addObject(`${hours}h`)
  }

  if (minutes > 0) {
    result.addObject(`${minutes}m`)
  }

  return result.join(' ');
}

export default helper(formatWorkingHours);
