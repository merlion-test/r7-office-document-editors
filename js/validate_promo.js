function Validator() {
	this.valid = true;
	this.messages = {
		empty: "Не заполнены обязательные поля",
		nothing: "Не выбрано значение поля",
		short: "Текст слишком короткий",
		email: "Некорректный email",
		policy: "Нет согласия с политикой",
		phone: "Некорректный телефон"
	};
	this.validate = function() {
		//	validate stuff
		return this.valid;
	};
}
Validator.prototype.validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};
Validator.prototype.validatePhone = function(num) {
	var re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
	return num.length > 5 && re.test(num);
};
var validator = new Validator();

$(document).ready(function() {
    
	$('form.former').off('submit');
	$('form.former input[type="submit"],form.former button[type="submit"]').click(function(evt) {
		var
			name = "",
			error_msg = [],
			$span = $('<span/>');
            validator.valid = true;
		
        evt.preventDefault();
        
		$(this).parents('form.former').find('input.validate-me,  select.validate-me, textarea.validate-me').filter(function() {
			return ['hidden', 'submit'].indexOf($(this).attr('type')) < 0
		}).each(function(i, e) {
			var
				name = $(e).attr('name'),
				_value = typeof $(e).val() == 'string' ? $(e).val().trim() : '',
				type = $(e).get(0).type,
				label = $(e).prev('label').text().toLowerCase(),
				placeholder = $(e).prop('placeholder') || null;
                
                //console.log(type);
                
			$(e).removeClass('error');
            $(e).parents('.input.radio').removeClass('error');
            
			if ((!_value.trim() || _value == 'не выбрано') && $(e).hasClass('validate-me')) {
				validator.valid = false
				$(e).addClass('error')
				$('.fill-form').css('display', 'block')
                //console.log('error xxx');
			}
			if (name == 'policy') {
				if (!$(e).is(':checked')) {
					error_msg.push(validator.messages.policy);
					validator.valid = false;
					//console.log('invalid policy')
					$(e).addClass('error')
				} else {
				    //console.log('valid policy')
				}
			}
			if (name == 'name') {
				if (_value.length < 3) {
					error_msg.push(validator.messages.short);
					validator.valid = false;
					// console.log('invalid name')
					$(e).addClass('error')
				}
			}
			if (name == 'email') {
				if (!validator.validateEmail(_value)) {
					error_msg.push(validator.messages.email);
					validator.valid = false;
					// console.log('invalid email')
					$(e).addClass('error')
				}
			}
			if (name == 'phone') {
				if (!validator.validatePhone(_value)) {
					error_msg.push(validator.messages.phone);
					validator.valid = false;
					// console.log('invalid phone')
					$(e).addClass('error')
				}
			}
			if (name == 'comment') {
				if (_value.length < 10) {
					error_msg.push(validator.messages.short);
					validator.valid = false;
					// console.log('invalid comment')
					$(e).addClass('error')
				}
			}
			if (type.indexOf('select') > -1) {
				if (!_value) {
					error_msg.push(validator.messages.nothing + ' ' + label);
					validator.valid = false;
					//console.log('invalid select')
					$(e).addClass('error')
				}
			}
			if (type.indexOf('radio') > -1) {
				if ($('input[name="'+name+'"]:checked').length == 0) {
					error_msg.push(validator.messages.nothing + ' ' + label);
					validator.valid = false;
					//console.log($(e).parents('.input.radio').length)
					$(e).parents('.input.radio').addClass('error')
				}
			}
			if (validator.valid) {
				// $(e).removeClass('error')
			} else {
				// $(e).addClass('error')
			}
		})
        
		if (validator.valid) {
			$('.fill-form').css('display', 'none');

            var fd = new FormData;
            var post_data = [];
            
            fd.append('type', 'register');
            if ($(this).parents('form.former').find('input[name=form_id]').length>0) {
                var formId = $(this).parents('form.former').find('input[name=form_id]').val();
            } else {
                var formId = $('#form_id').data('id');
            }
               fd.append('form_id', formId);
            
            $('.send-text-after').remove();
            $(this).parents('form.former').parent('div').append('<div class="send-text-after"></div>');
			$(this).parents('form.former').css('display', 'none');
            
			$(this).parents('form.former').find('input[type="text"],input[type="hidden"],textarea').each(function() {
                fd.append($(this).prop('name'), $(this).val());
			});
			$(this).parents('form.former').find('input[type="radio"]:checked').each(function() {
                fd.append($(this).prop('name'), $(this).val());
			});
			$(this).parents('form.former').find('input[type="file"]').each(function() {
                fd.append($(this).prop('name'), $(this).prop('files')[0]);
			});
			$(this).parents('form.former').find('input[type="checkbox"]:checked').each(function() {
			     if(post_data[$(this).prop('name')]!==undefined){
			     	post_data[$(this).prop('name')] += $(this).val()+' '
                }else{
                    post_data[$(this).prop('name')] = $(this).val()+' '
                }
			});
            
            for(var index in post_data) { 
                fd.append(index, post_data[index]);
            }
			$(this).parents('form.former').find('select option:selected').each(function() {
                 fd.append($(this).parent('select').prop('name'), $(this).text());
			});
            fd.append('host', window.location.host);

            var url =
							(window.location.host !== 'promo.merlion.com' && window.location.host !== 'promo-dev.merlion.com') ?
								'https://event.merlion.com/2021/project_library/ajax/post_2.php' :
								'/ajax/post_2.php';

			$.ajax({
				/*method: "POST",*/
				url: url,
                data: fd,
                processData: false,
                contentType: false,
                type: 'post',
                success: function(data) {
                    console.log(data);
			     if(data=='0'){
			         $('.hero-form .overflow .inps').append('Извините, заявка не отправлена');
			     }else{
			         if ($('.hero-form .overflow .inps').length>0) {
    			         	$('.hero-form .overflow .inps').html(data);	
			         } else {
 			            $('.send-text-after').html(data);
			         }
                     $('#thisFormId').trigger('click');
                     $(this).parents('form.former').addClass('sentForm')
                     console.log('send');
			     }
                 },
                 error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                 }
				/*console.log(post_data)
				console.log(data)
				var result = JSON.parse(data);
				if (result.type == 'error') {
					// if errors show error msg
					$span.addClass('error')
				} else {
					// else show success msg
					$('form.former > .row').hide();
				}
				$span.text(result.message)
				$('form.former').find('.result').html($span)
				console.log(result)*/
			});
		} else {
			console.log('invalid')
			if (error_msg.length) {
                if ($('.hero-form .overflow .inps').length>0) {
 			            $('.hero-form .overflow .inps').html(error_msg.shift());	
			         } else {
    			         $('.send-text-after').html(error_msg.shift());	
			         }
                     				
			} else {
                if ($('.hero-form .overflow .inps').length>0) {
 			            $('.hero-form .overflow .inps').html(validator.messages.empty);	
			         } else {
    			         $('.send-text-after').html(validator.messages.empty);	
			         }
			}
			$('.error').eq(0).focus()
		}
	})
});