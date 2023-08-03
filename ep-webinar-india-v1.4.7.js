var no_of_webinar_slots = 6;
var interviewPrepURL,switchUpURL;

$(document).ready(function() {
var int_phone3;
let utmpams = getUTMParams();

if(webinarType == "CAREER_SESSION"){
  if (utmpams['event_title'] != undefined){
    $(".webinar__lightbox-title").text(decodeURIComponent(utmpams['event_title']));
	  $('input[name="Event Name"]').val(decodeURIComponent(utmpams['event_title']));
    eventName = decodeURIComponent(utmpams['event']);
  }else{
    $(".webinar__lightbox-title").text("Seize the AI Advantage: Strengthen Your Resume");
	  $('input[name="Event Name"]').val("Seize the AI Advantage: Strengthen Your Resume");
    eventName = "Seize the AI Advantage: Strengthen Your Resume";
  }
}else if(webinarType == "SWITCH_UP"){
  if (utmpams['event_title'] != undefined){
    $(".webinar__lightbox-title").text(decodeURIComponent(utmpams['event_title']));
	  $('input[name="Event Name"]').val(decodeURIComponent(utmpams['event_title']));
    eventName = decodeURIComponent(utmpams['event']);
  }else{
    $(".webinar__lightbox-title").text("Future-proof your career with AI/ ML, Data Science");
    $('input[name="Event Name"]').val("Future-proof your career with AI/ ML, Data Science");
    eventName = "Future-proof your career with AI/ ML, Data Science";
  }
}else{
  if (utmpams['event_title'] != undefined){
    $(".webinar__lightbox-title").text(decodeURIComponent(utmpams['event_title']));
	  $('input[name="Event Name"]').val(decodeURIComponent(utmpams['event_title']));
    eventName = decodeURIComponent(utmpams['event']);
  }else{
    $(".webinar__lightbox-title").text("How to Nail your next Technical Interview");
	  $('input[name="Event Name"]').val("How to Nail your next Technical Interview");
    eventName = "How to Nail your next Technical Interview";
  }
}
  $('.webinar-lightbox-close').click(function(e) {
      $('.webinar__lightbox').css('display','none');
      $('body').css('overflow','auto');
  });

  if(isSwitchUp == "No"){
   let api_url = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=IND&program=Backend&timezone="+v_timezone+"&type="+webinarType;
	
  let xhr = new XMLHttpRequest();
    xhr.open('GET',api_url,true);
    xhr.setRequestHeader("Authorization","1Cgx6oYXkOlWkNDn7_tXO");
    //var tz = new Date().toString().match(/\((.+)\)/);
    /*  if (tz[1].includes(" ")) {
        tz = tz[1]
          .split(" ")
          .map(([first]) => first)
          .join("");
      }*/

    xhr.onload = function(){
      if(this.status == 200){
        let resobj = JSON.parse(this.response);
	if(webinarType == "SWITCH_UP"){
		resobj = resobj.map(item => ({ ...item, webinar_lead_type: "SWITCH_UP" }));
	      }else{
		 resobj = resobj.map(item => ({ ...item, webinar_lead_type: "REGULAR" }));
	      }
        populateWebinarSlots(resobj);
      }else{
        console.error("P0: The Uplevel Webinar Slots API Failed."); 
	registration_type = "calendly";
      }
    }
    xhr.onerror = function(){
      console.error("P0: The Uplevel Webinar Slots API Failed."); 
      registration_type = "calendly";
    }
    xhr.send();
  }else{
      interviewPrepURL = 'https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=IND&program=Backend&timezone='+v_timezone+'&type=REGULAR';
      switchUpURL = 'https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=IND&program=Backend&timezone='+v_timezone+'&type=SWITCH_UP';
      combineResponses().then((data) => {
        console.log(data);
        populateWebinarSlots(data);
      });
  }
});
  
    if(document.querySelector("#webinar_pnumber") != null){
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
    }
     $('.btn-back-to-step1').click(function(e) {
      	$('.webinar__registration-form1').show();
        $('.webinar__registration-success').hide();
     		$('.webinar__registration-form1-block').show();
        $('.webinar__registration-form2-block').hide();
     });

function populateWebinarSlots(resobj){
	const t_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let utmparams = getUTMParams();
  
  if((utmparams['startdate'] != undefined) && (utmparams['enddate'] != undefined)){
      let newresobj = getItemsByDateRange(utmparams['startdate'],utmparams['enddate'],resobj);
      resobj = (newresobj.length == 0) ? resobj : newresobj;
    }
  
	if(resobj.length == 0){
      	  console.error("P0: The Uplevel Webinar Slots API Returned No Data.");
      	  registration_type = "calendly";
      	}else{
      	   registration_type = "byecalendly";
      	}
	
	no_of_webinar_slots = (no_of_webinar_slots == undefined) ? 4 : no_of_webinar_slots;
	let nslots = (resobj.length > no_of_webinar_slots) ? no_of_webinar_slots : resobj.length;
	var tz = new Date().toString().match(/\((.+)\)/);
	if (tz[1].includes(" ")) {
        tz = tz[1]
          .split(" ")
          .map(([first]) => first)
          .join("");
      	}
	
	for (i=0;i<nslots;i++){
	  var hdate = resobj[i].weekday +", "+ resobj[i].day + " " + t_months[parseInt(resobj[i].month)-1] + " "+ resobj[i].year + " | " + resobj[i].hour +":" + resobj[i].minute +" "+resobj[i].am_or_pm;
	  var radiohtml = '<label class="select-webinar-slot w-radio"><input type="radio" name="start-date" value="'+ resobj[i].start_time +'" data-endtime="'+resobj[i].end_time+'" data-invitee_starttime="'+ resobj[i].invitee_start_time +'" data-invitee_endtime="'+ resobj[i].invitee_end_time +'" data-name="'+ resobj[i].start_time +'" data-webinar_lead_type="'+ resobj[i].webinar_lead_type +'" class="w-form-formradioinput select-webinar-radio-btn w-radio-input"><span class="w-form-label" for="start-date-'+i+'">'+hdate+' '+ tz +'</span></label>';
	  $('.webinar__slots').append(
	    $(radiohtml)
	  );
	}
}

function getItemsByDateRange(startDate, endDate, data) {
    var startDate = new Date(startDate);
    var endDate = new Date(endDate);

    return $.grep(data, function(item) {
        var itemDate = new Date(item.start_time);
        return itemDate >= startDate && itemDate <= endDate;
    });
}

// Function to fetch data from an API
async function fetchData(url) {
  const response = await fetch(url, {
    headers: {
      "Authorization": "1Cgx6oYXkOlWkNDn7_tXO"
    }
  });
  const data = await response.json();
  return data;
}

// Function to combine the responses into one JSON array
async function combineResponses() {
  try {
    let interviewPrepData = await fetchData(interviewPrepURL);
    let switchUpData = await fetchData(switchUpURL);

    // Add new property to each object in the arrays
    interviewPrepData = interviewPrepData.map(item => ({ ...item, webinar_lead_type: "REGULAR" }));
    switchUpData = switchUpData.map(item => ({ ...item, webinar_lead_type: "SWITCH_UP" }));

    // Filter out the entries from interviewPrepData if switchUpData has a value on the same day
    const combinedData = [...interviewPrepData];
	  
    for (const switchUpEntry of switchUpData) {
      const sameDayEntryIndex = combinedData.findIndex((entry) => entry.day === switchUpEntry.day);
      if (sameDayEntryIndex !== -1) {
        combinedData.splice(sameDayEntryIndex, 1);
      }
      combinedData.push(switchUpEntry);
    }
    // Sort the combinedData array by start_time
    combinedData.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    return combinedData;
  } catch (error) {
    console.error('Error:', error);
  }
}
  
  function pushToEndPoint(endpoint){
    //Zap end point for step 1
    
          var formData = {
            "First Name": $('.wr__firstname').val(), 
            "Last Name": $('.wr__lastname').val(),
            "Email Address": $('.email').val(),
            "ByeCalendlyType": $('.bye-calendly-type').val(),
            "webinar-type": $('.webinar-type').val(),
            "Webinar Lead Type": $('.webinar-lead-type').val(),
            "utm_source": $('.utm_source').val(),
            "utm_medium": $('.utm_medium').val(),
            "utm_campaign": $('.utm_campaign').val(),
            "utm_content": $('.utm_content').val(),
            "utm_adset": $('.utm_adset').val(),
            "utm_term": $('.utm_term').val(),

            "City": $('.wr__city').val(),
            "Device": $('.wr__device').val(),
            "Referrer": $('.wr__referrer').val(),
            "Region": $('.wr__region').val(),
            
            "gclid": $('.gclid').val(),
            "msclkid": $('.msclkid').val(),
            "fbclid": $('.fbclid').val(),
            "user_id": $('.user_id').val(),
            
            "cta_page_url": $('.cta_page_url').val(),
            "landing_page_url": $('.l_page_url').val(),
            "event_name": eventName,
            "user_timezone": $('.user_timezone').val(),
            "page_url": $('.page_url').val(),
            "site_url": $('.site_url').val(),
            "v_country": $('.v_country').val(),
            "salesforce_uuid": $('.salesforce_uuid').val(),
            "phone_number_full": $('.tno1').val(),
            "is_exit_intent_popup": $('.is_exit_intent_popup').val(),
	    
            "Event Start Time" : $('.wr__event-start-time').val(),
            "Event End Time" : $('.wr__event-end-time').val(),
            "Invitee Start Time" : $('.wr__invitee-start-time').val(),
            "Invitee End Time" : $('.wr__invitee-end-time').val(),
          };
          
          $.ajax({
            type: "POST",
            url: endpoint,
            data: formData,
            success: function (e) {
              if(e.status == "success"){
                console.log("Form submitted successfully!");
              }else{
                console.error("P0: The Zapier Webhook Failed."); 
              }
            }
          });
    }
  
     $('.bc__btn-select-webinar-slot').click(function(e) {
  	e.preventDefault();
      	setHiddenFields();
       
        let fullphonenumber3 = int_phone3.getNumber(intlTelInputUtils.numberFormat.E164);
        $("input[name='phone_number[intphone_full]'").val(fullphonenumber3);
        $(".tno1").val(fullphonenumber3);
        
        $( ".full-name, .phone, .email" ).keypress(function() {
             $('.full-name-error,.email-id-error,.phone-error').addClass('hide');
          });
    	
        $( ".full-name, .phone, .email" ).focus(function() {
             $('.full-name-error, .email-id-error,.phone-error').addClass('hide');
    	});
        
        //let active_visit = read_cookie("v_latest");
        let name_regex = new RegExp("^[a-zA-Z ]+$");
        let email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;
                
        if( 
            ($(".full-name").val().length == 0) &&
            ($(".email").val().length == 0) &&
            ($(".phone").val().length == 0)){
             //$('.full-name, .email, .phone').addClass('input-error');
             $('.full-name-error,.email-id-error,.phone-error').removeClass('hide');
        }
    		else if (!name_regex.test($(".full-name").val()) || $(".full-name").val().length == 0){
            $('.full-name-error').removeClass('hide');
        }else if(!phone_regex.test($(".phone").val()) || $(".phone").val().length == 0){
          $('.phone-error').removeClass('hide');
        }else if (!email_regex.test($(".email").val()) || $(".email").val().length == 0){
        	$('.email-id-error').removeClass('hide');
        }else{
          $('.webinar__loadingbar').css("display","flex");
          
          let fullname = $(".full-name").val();
	  
          if(fullname.substring(0, fullname.indexOf(' ')) == ''){
            $('.wr__firstname').val(fullname.substring(fullname.indexOf(' ') + 1));
            $('.wr__lastname').val(fullname.substring(fullname.indexOf(' ') + 1));
          }else if(fullname.substring(fullname.indexOf(' ') + 1) == ''){
            $('.wr__firstname').val(fullname.substring(0, fullname.indexOf(' ')));
            $('.wr__lastname').val(fullname.substring(0, fullname.indexOf(' ')));
          }else{
            $('.wr__firstname').val(fullname.substring(0, fullname.indexOf(' ')));
            $('.wr__lastname').val(fullname.substring(fullname.indexOf(' ') + 1));
          }

          $('.wr__email').val($(".email").val());
          $('.wr__phone').val(fullphonenumber3);
          dataLayer.push({
              'event': 'new_webinar_registration_form_submitted',
              'webinar_name': (document.querySelector('.webinar__lightbox-title').innerHTML)
          });
          
          pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/34xpbjl/");
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
          $('.webinar-lead-type').val($("input[name='start-date']:checked").data('webinar_lead_type'));

          $('.wr__whatsappconsent').val($('.whatsapp-consent').is(":checked"));
       
   });
 
     $('.bc__btn-2nd-step').click(function(e) {
     		e.preventDefault();
	     setHiddenFields();
        if($("input:radio[name='start-date']").is(":checked")) {
            let estarttime = $('input[name="start-date"]:checked').val();
            let eendtime = $('input[name="start-date"]:checked').data('endtime');
            let utmm = visitor_id+":"+v_country;
            let sf_uuid= v_timezone +":in.ik"+cta_lp+":in.ik"+getCookie("ik-landingpage");
            let utmstring = "?assigned_to=Interview Kickstart&invitee_first_name="+$('.wr__firstname').val()+"&invitee_last_name="+$('.wr__lastname').val()+"&invitee_email="+$('.wr__email').val()+"&answer_1="+$('.wr__phone').val()+"&event_start_time="+estarttime+"&event_end_time="+eendtime+"&utm_medium="+utmm+"&salesforce_uuid="+sf_uuid+"&whatsapp_consent="+$('.wr__whatsappconsent').val();
            let finalurl = "/signup-final-step"+utmstring;
            $('.wr__event-start-time').val(estarttime);
    	      $('.wr__event-end-time').val(eendtime);
            $('.wr__invitee-start-time').val($("input[name='start-date']:checked").data('invitee_starttime'));
   	        $('.wr__invitee-end-time').val($("input[name='start-date']:checked").data('invitee_endtime'));
          	$('.webinar-lead-type').val($("input[name='start-date']:checked").data('webinar_lead_type'));

            $('.webinar__loadingbar').show();
          
            pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/34xpujj/");
            $('.webinar__registration-form2').submit();
          
            setTimeout(function(){
              location.href = finalurl;
            }, 400);
        }
     });
