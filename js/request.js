$(document).ready(function() {
  $('#form_input_i1 input').attr('placeholder', 'Имя')
  $('#form_input_i2 input').attr('placeholder', 'E-mail')
  $('#form_input_i3 input').attr('placeholder', 'Телефон')
  $('textarea').attr('placeholder', 'Вопрос')

  $('#requestForm .former').prepend('<input type="hidden" name="form_id" value="'+ $('#requestFormId').data('id')+'">');

  $('.checkbox-field, .checkbox-field+.input.text').wrapAll("<div class='policy-checkbox'>");
});





