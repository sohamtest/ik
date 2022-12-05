$(document).ready(function() {
var int_phone3;
  $('.webinar-lightbox-close').click(function(e) {
  		$('.webinar__lightbox').css('display','none');
      $('body').css('overflow','auto');
  });
  
 const t_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
 let api_url = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=IND&program=Backend&timezone="+v_timezone;
	
  let xhr = new XMLHttpRequest();
    xhr.open('GET',api_url,true);
    xhr.setRequestHeader("Authorization","1Cgx6oYXkOlWkNDn7_tXO");
    var tz = new Date().toString().match(/\((.+)\)/);
      if (tz[1].includes(" ")) {
        tz = tz[1]
          .split(" ")
          .map(([first]) => first)
          .join("");
      }

    xhr.onload = function(){
      if(this.status == 200){
        let resobj = JSON.parse(this.response);
	if(resobj.length == 0){
		registration_type = "calendly";
	}else{
		registration_type = "byecalendly";
	}
        
        for (i=0;i<resobj.length;i++){
          var hdate = resobj[i].weekday +", "+ resobj[i].day + " " + t_months[parseInt(resobj[i].month)-1] + " "+ resobj[i].year + " | " + resobj[i].hour +":" + resobj[i].minute +" "+resobj[i].am_or_pm;
					var radiohtml = '<label class="select-webinar-slot w-radio"><input type="radio" name="start-date" value="'+ resobj[i].start_time +'" data-endtime="'+resobj[i].end_time+'" data-invitee_starttime="'+ resobj[i].invitee_start_time +'" data-invitee_endtime="'+ resobj[i].invitee_end_time +'" data-name="'+ resobj[i].start_time +'" class="w-form-formradioinput select-webinar-radio-btn w-radio-input"><span class="w-form-label" for="start-date-'+i+'">'+hdate+' '+ tz +'</span></label>';
          $('.webinar__slots').append(
            $(radiohtml)
          );
        }
      }else{
        registration_type = "calendly";
      }
    }
    xhr.onerror = function(){
      registration_type = "calendly";
    }
    xhr.send();
       
   	int_phone3 = window.intlTelInput(document.querySelector("#webinar_pnumber"), {
        initialCountry: "auto",
         geoIpLookup: function(callback) {
            $.get('https://get.geojs.io/v1/ip/country.json', function() {}, "json").always(function(resp) {
              var countryCode = (resp && resp.country) ? resp.country : "us";
              callback(countryCode);
            });
          },
        hiddenInput: "full",
        utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
      });
      
     $('.btn-back-to-step1').click(function(e) {
      	$('.webinar__registration-form1').show();
        $('.webinar__registration-success').hide();
     		$('.webinar__registration-form1-block').show();
        $('.webinar__registration-form2-block').hide();
     });

     $('.bc__btn-select-webinar-slot').click(function(e) {
  			e.preventDefault();
      	setHiddenFields();
       
        let fullphonenumber3 = int_phone3.getNumber(intlTelInputUtils.numberFormat.E164);
        $("input[name='phone_number[intphone_full]'").val(fullphonenumber3);
        $(".tno1").val(fullphonenumber3);
        
        $( ".first-name, .last-name, .phone, .email" ).keypress(function() {
             $('.first-name-error, .last-name-error,.email-id-error,.phone-error').addClass('hide');
          });
    	
        $( ".first-name, .last-name, .phone, .email" ).focus(function() {
             $('.first-name-error, .last-name-error,.email-id-error,.phone-error').addClass('hide');
    		});
        
        //let active_visit = read_cookie("v_latest");
        let name_regex = new RegExp("^[a-zA-Z ]+$");
        let email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;
                
        if( 
            ($(".first-name").val().length == 0) &&
            ($(".last-name").val().length == 0) &&
            ($(".email").val().length == 0) &&
            ($(".phone").val().length == 0)){
             //$('.first-name, .last-name, .email, .phone').addClass('input-error');
             $('.first-name-error, .last-name-error,.email-id-error,.phone-error').removeClass('hide');
        }
    		else if (!name_regex.test($(".first-name").val()) || $(".first-name").val().length == 0){
            $('.first-name-error').removeClass('hide');
        }else if (!name_regex.test($(".last-name").val()) || $(".last-name").val().length == 0){
        	$('.last-name-error').removeClass('hide');
        }else if(!phone_regex.test($(".phone").val()) || $(".phone").val().length == 0){
          $('.phone-error').removeClass('hide');
        }else if (!email_regex.test($(".email").val()) || $(".email").val().length == 0){
        	$('.email-id-error').removeClass('hide');
        }else{
          $('.webinar__loadingbar').css("display","flex");
          $('.wr__firstname').val($(".first-name").val());
          $('.wr__lastname').val($(".last-name").val());
          $('.wr__email').val($(".email").val());
          $('.wr__phone').val(fullphonenumber3);
          dataLayer.push({
              'event': 'new_webinar_registration_form_submitted',
              'webinar_name': (document.querySelector('.webinar__lightbox-title').innerHTML)
          });
        	$('.webinar__registration-form1').submit();
          $('.webinar__registration-form1-block').hide();
          	setTimeout(function(){
              $('.webinar__registration-form2-block').show();
          		$('.webinar__loadingbar').hide();
            }, 200);
         
        }
          $("input:radio[name='start-date']:first").attr("checked", true);
          $('.wr__event-start-time').val($("input:radio[name='start-date']:first").val());
   				$('.wr__event-end-time').val($("input:radio[name='start-date']:first").data('endtime'));
          $('.wr__invitee-start-time').val($("input:radio[name='start-date']:first").data('invitee_starttime'));
   				$('.wr__invitee-end-time').val($("input:radio[name='start-date']:first").data('invitee_endtime'));
   });
 
     $('.bc__btn-2nd-step').click(function(e) {
     		e.preventDefault();
        if($("input:radio[name='start-date']").is(":checked")) {
            let estarttime = $('input[name="start-date"]:checked').val();
            let eendtime = $('input[name="start-date"]:checked').data('endtime');
            let utmm = visitor_id+":"+v_country;
            let sf_uuid= v_timezone +":ik"+cta_lp+":ik"+getCookie("ik-landingpage-v2");
            let utmstring = "?assigned_to=Interview Kickstart&invitee_first_name="+$('.wr__firstname').val()+"&invitee_last_name="+$('.wr__lastname').val()+"&invitee_email="+$('.wr__email').val()+"&answer_1="+$('.wr__phone').val()+"&event_start_time="+estarttime+"&event_end_time="+eendtime+"&utm_medium="+utmm+"&salesforce_uuid="+sf_uuid;
            let finalurl = "https://www.interviewkickstart.com/signup-final-step"+utmstring;
            $('.wr__event-start-time').val(estarttime);
    				$('.wr__event-end-time').val(eendtime);
            $('.wr__invitee-start-time').val($("input[name='start-date']:checked").data('invitee_starttime'));
   					$('.wr__invitee-end-time').val($("input[name='start-date']:checked").data('invitee_endtime'));
            $('.webinar__loadingbar').show();
            $('.webinar__registration-form2').submit();
            setTimeout(function(){
              location.href = finalurl;
            }, 1000);
        }
     });
});
