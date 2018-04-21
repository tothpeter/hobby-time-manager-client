import Ember from 'ember';

const {
  Handlebars: { Utils: { escapeExpression }},
  Helper: { helper },
  String: { htmlSafe }
} = Ember;


export function nl2br([text]) {
  var breakTag = '<br />';
  return new htmlSafe(`${escapeExpression(text)}`.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'));
}

export default helper(nl2br);
