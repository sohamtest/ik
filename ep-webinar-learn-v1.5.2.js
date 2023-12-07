var experiment_type, exitintent_freecourse, v_timezone_formatted, interviewPrepURL, switchUpURL;

function getDeviceType() {
  var userAgent = navigator.userAgent;

  if (/mobile/i.test(userAgent)) {
    return 'Mobile';
  } else if (/iPad|Android|Touch/i.test(userAgent)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}

$(document).ready(function () {
  var int_phone3;

  let utmpams = getAllUrlParams();

  if (webinarType == "CAREER_SESSION") {
    if (utmpams['event'] != undefined) {
      $(".webinar__lightbox-title").text(decodeURIComponent(utmpams['event']));
      $('input[name="Event Name"]').val(decodeURIComponent(utmpams['event']));
      eventName = decodeURIComponent(utmpams['event']);
    } else {
      $(".webinar__lightbox-title").text("Seize the AI Advantage: Strengthen Your Resume");
      $('input[name="Event Name"]').val("Seize the AI Advantage: Strengthen Your Resume");
      eventName = "Seize the AI Advantage: Strengthen Your Resume";
    }
  } else if (webinarType == "SWITCH_UP") {
    if (utmpams['event'] != undefined) {
      $(".webinar__lightbox-title").text(decodeURIComponent(utmpams['event']));
      $('input[name="Event Name"]').val(decodeURIComponent(utmpams['event']));
      eventName = decodeURIComponent(utmpams['event']);
    } else {
      $(".webinar__lightbox-title").text("Future-proof your career with AI/ ML, Data Science");
      $('input[name="Event Name"]').val("Future-proof your career with AI/ ML, Data Science");
      eventName = "Future-proof your career with AI/ ML, Data Science";
    }
  } else {
    if (utmpams['event'] != undefined) {
      $(".webinar__lightbox-title").text(decodeURIComponent(utmpams['event']));
      $('input[name="Event Name"]').val(decodeURIComponent(utmpams['event']));
      eventName = decodeURIComponent(utmpams['event']);
    } else {
      $(".webinar__lightbox-title").text("How to Nail your next Technical Interview");
      $('input[name="Event Name"]').val("How to Nail your next Technical Interview");
      eventName = "How to Nail your next Technical Interview";
    }
  }

  $('.webinar-lightbox-close').click(function (e) {
    if (experiment_type == "ExitIntent") {
      $('.webinar__lightbox-card').css('display', 'none');
      $('.webinar__lightbox-exit-intent').css('display', 'block');
    } else if (exitintent_freecourse == true) {
      $('.webinar__lightbox-card').css('display', 'none');
      $('.webinar__lightbox-free-course').css('display', 'block');
      $('.exitintent-fc-email').val($(".email").val());

      dataLayer.push({
        'event': 'exit_intent',
        'eventCategory': 'exit_intent_free_course',
        'eventAction': 'exit_intent_free_course',
        'eventLabel': 'form triggered'
      });

    } else {
      $('.webinar__lightbox').css('display', 'none');
      $('body').css('overflow', 'auto');

      if ($('.is_exit_intent_popup').val() == "On Scroll") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_scroll',
          'eventAction': 'exit_intent_scroll',
          'eventLabel': 'close'
        });
      }

      if ($('.is_exit_intent_popup').val() == "Browser Tab") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_browser_tab_close_gesture',
          'eventAction': 'exit_intent_browser_tab_close_gesture',
          'eventLabel': 'close'
        });
      }

    }
  });

  $('.btn-getaccess').click(function (e) {
    e.preventDefault();
    let email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $(".exitintent-fc-email").keypress(function () {
      $('.exitintent-fc-email-error').addClass('hide');
    });

    $(".exitintent-fc-email").focus(function () {
      $('.exitintent-fc-email-error').addClass('hide');
    });

    if ((!email_regex.test($(".exitintent-fc-email").val()) || $(".exitintent-fc-email").val().length == 0)) {
      $('.exitintent-fc-email-error').removeClass('hide');
    } else {
      $('.exit-intent-free-course-form').submit();
      dataLayer.push({
        'event': 'exit_intent',
        'eventCategory': 'exit_intent_free_course',
        'eventAction': 'exit_intent_free_course',
        'eventLabel': 'form submitted'
      });
      $('.webinar-lightbox-exitintent-freecourse-close').hide();
      setTimeout(function () {
        $('.webinar__lightbox').css('display', 'none');
        $('.webinar__lightbox-free-course').css('display', 'none');
        $('.webinar__lightbox-card').css('display', 'flex');
        $('body').css('overflow', 'auto');
        $('.exit-intent-free-course-form').css("display", "block");
        $('.success-message-9').css("display", "none");
        $('.webinar-lightbox-exitintent-freecourse-close').show();
      }, 2000);
    }
  });

  $('.webinar-lightbox-exitintent-freecourse-close').click(function (e) {
    $('.webinar__lightbox').css('display', 'none');
    $('.webinar__lightbox-free-course').css('display', 'none');
    $('.webinar__lightbox-card').css('display', 'flex');
    $('body').css('overflow', 'auto');
    dataLayer.push({
      'event': 'exit_intent',
      'eventCategory': 'exit_intent_free_course',
      'eventAction': 'exit_intent_free_course',
      'eventLabel': 'close'
    });
  });

  $('.bc-popup-cta1').click(function (e) {
    $('.webinar__lightbox-card').css('display', 'flex');
    $('.webinar__lightbox-exit-intent').css('display', 'none');
  });

  $('.bc-popup-cta2').click(function (e) {
    $('.webinar__lightbox-card').css('display', 'flex');
    $('.webinar__lightbox-exit-intent').css('display', 'none');
    $('.webinar__lightbox').css('display', 'none');
    $('body').css('overflow', 'auto');
  });

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

  function populateWebinarSlots(resobj) {
    const t_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (resobj.length == 0) {
      registration_type = "calendly";
    } else {
      registration_type = "byecalendly";
    }
    let noslots = (resobj.length > 6) ? 6 : resobj.length;

    for (i = 0; i < noslots; i++) {
      var hdate = resobj[i].weekday + ", " + resobj[i].day + " " + t_months[parseInt(resobj[i].month) - 1] + " " + resobj[i].year + " | " + resobj[i].hour + ":" + resobj[i].minute + " " + resobj[i].am_or_pm;
      var radiohtml = '<label class="select-webinar-slot w-radio"><input type="radio" name="start-date" value="' + resobj[i].start_time + '" data-endtime="' + resobj[i].end_time + '" data-invitee_starttime="' + resobj[i].invitee_start_time + '" data-invitee_endtime="' + resobj[i].invitee_end_time + '" data-name="' + resobj[i].start_time + '" class="w-form-formradioinput select-webinar-radio-btn w-radio-input" data-webinar_lead_type="' + resobj[i].webinar_lead_type + '"><span class="w-form-label" for="start-date-' + i + '">' + hdate + '</span></label>';
      //var radiohtmlv2 = '<div class="ws-card"><div class="ws-card__day">'+ resobj[i].weekday.substring(0, 3) +'</div><div class="slot-status-grid"><div class="ws-card__date">'+ resobj[i].day +'</div><div class="ws-almost-full">Almost full!</div></div><div class="form-slot-block"><label class="form-radio-btn-block-slot w-radio"><div class="w-form-formradioinput w-form-formradioinput--inputType-custom ws-card__time-card w-radio-input"></div><input style="opacity:0;position:absolute;z-index:-1" type="radio" name="start-date" value="'+ resobj[i].start_time +'" data-endtime="'+resobj[i].end_time+'" data-invitee_starttime="'+ resobj[i].invitee_start_time +'" data-invitee_endtime="'+ resobj[i].invitee_end_time +'" data-name="'+ resobj[i].start_time +'" data-webinar_lead_type="'+ resobj[i].webinar_lead_type +'"><span class="slod-text-hide w-form-label" for="radio-10">'+resobj[i].invitee_start_time.substring(0, 7) +'-'+ resobj[i].invitee_end_time.substring(0, 7)+'</span></label><div class="slot-time-block"><div class="ws-time">'+resobj[i].invitee_start_time.substring(0, 5) +' - '+ newSlotStr +'</div><div class="slot-available-grid"><div>Available Slots -</div><div class="ws-available-slots red">'+available_slots+'</div></div></div></div></div>';
      $('.webinar__slots').append($(radiohtml));
    }
  }

  let v_timezone_formatted = v_timezone.replace("+", "%2B");
  let api_url = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=USA&program=Backend&timezone=" + v_timezone_formatted + "&type=" + webinarType;

  if (isSwitchUp == "No") {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', api_url, true);
    xhr.setRequestHeader("Authorization", "1Cgx6oYXkOlWkNDn7_tXO");
    var tz = new Date().toString().match(/\((.+)\)/);
    if (tz[1].includes(" ")) {
      tz = tz[1]
        .split(" ")
        .map(([first]) => first)
        .join("");
    }

    xhr.onload = function () {
      if (this.status == 200) {
        let resobj = JSON.parse(this.response);
        if (resobj.length == 0) {
          registration_type = "calendly";
        } else {
          registration_type = "byecalendly";
        }
        if (webinarType == "SWITCH_UP") {
          resobj = resobj.map(item => ({ ...item, webinar_lead_type: "SWITCH_UP" }));
        } else if (webinarType == "CAREER_SESSION") {
          resobj = resobj.map(item => ({ ...item, webinar_lead_type: "CAREER_SESSION" }));
        } else {
          resobj = resobj.map(item => ({ ...item, webinar_lead_type: "REGULAR" }));
        }
        populateWebinarSlots(resobj);

      } else {
        registration_type = "calendly";
      }
    }
    xhr.onerror = function () {
      registration_type = "calendly";
    }
    xhr.send();
  } else {
    interviewPrepURL = 'https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=USA&program=Backend&timezone=' + v_timezone_formatted + '&type=REGULAR';
    switchUpURL = 'https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=USA&program=Backend&timezone=' + v_timezone_formatted + '&type=SWITCH_UP';
    combineResponses().then((data) => {
      console.log(data);
      populateWebinarSlots(data);
    });
  }

  if ($('.bye-calendly-type').val() != "NoPhoneInTheFirstStep") {

    if (document.querySelector("#webinar_pnumber") != null) {
      int_phone3 = window.intlTelInput(document.querySelector("#webinar_pnumber"), {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
          $.get('https://get.geojs.io/v1/ip/country.json', function () { }, "json").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            callback(countryCode);
          });
        },
        hiddenInput: "full",
        utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
      });
    }
  }

  $('.btn-back-to-step1').click(function (e) {
    $('.webinar__registration-form1').show();
    $('.webinar__registration-success').hide();
    $('.webinar__registration-form1-block').show();
    $('.webinar__registration-form2-block').hide();
  });

  function pushToEndPoint(endpoint) {
    //Zap end point for step 1

    var formData = {
      "First Name": $('.wr__firstname').val(),
      "Last Name": $('.wr__lastname').val(),
      "Email Address": $('.wr__email').val(),
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

      "Event Start Time": $('.wr__event-start-time').val(),
      "Event End Time": $('.wr__event-end-time').val(),
      "Invitee Start Time": $('.wr__invitee-start-time').val(),
      "Invitee End Time": $('.wr__invitee-end-time').val(),
      "Work Experience": $('.gql-work-experience').val(),
      "Domain or Role": $('.gql-role-domain').val(),

    };

    $.ajax({
      type: "POST",
      url: endpoint,
      data: formData,
      success: function (e) {
        if (e.status == "success") {
          console.log("Form submitted successfully!");
        }
      }
    });
  }

  $('.bc__btn-newsletter-subscription').click(function (e) {
    e.preventDefault();
    setHiddenFields();
    let email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $(".email").keypress(function () {
      $('.email-id-error').addClass('hide');
    });

    $(".email").focus(function () {
      $('.email-id-error').addClass('hide');
    });

    if (!email_regex.test($(".email").val()) || $(".email").val().length == 0) {
      $('.email-id-error').removeClass('hide');
    } else {
      $('.wr__emailid').val($(".email").val());
      pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/3tvfocs/");

      $('.webinar__loadingbar').css("display", "flex");
      $('.newsletter-subscription-form1').submit();
      $('.newsletter-form-step1').hide();

      setTimeout(function () {
        $('.webinar__registration-form1-block').show();
        $('.webinar__loadingbar').hide();
      }, 200);
    }
  });

  $('.bc__btn-select-webinar-slot-newsletter').click(function (e) {
    e.preventDefault();
    setHiddenFields();

    let fullphonenumber3 = int_phone3.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(fullphonenumber3);
    $(".tno1").val(fullphonenumber3);

    $(".first-name, .last-name, .phone").keypress(function () {
      $('.first-name-error, .last-name-error,.phone-error').addClass('hide');
    });

    $(".first-name, .last-name, .phone").focus(function () {
      $('.first-name-error, .last-name-error,.phone-error').addClass('hide');
    });

    //let active_visit = read_cookie("v_latest");
    let name_regex = new RegExp("^[a-zA-Z ]+$");
    let phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;

    if (
      ($(".first-name").val().length == 0) &&
      ($(".last-name").val().length == 0) &&
      ($(".phone").val().length == 0)) {
      $('.first-name-error, .last-name-error,.phone-error').removeClass('hide');
    }
    else if (!name_regex.test($(".first-name").val()) || $(".first-name").val().length == 0) {
      $('.first-name-error').removeClass('hide');
    } else if (!name_regex.test($(".last-name").val()) || $(".last-name").val().length == 0) {
      $('.last-name-error').removeClass('hide');
    } else if (!phone_regex.test($(".phone").val()) || $(".phone").val().length == 0) {
      $('.phone-error').removeClass('hide');
    } else {
      $('.webinar__loadingbar').css("display", "flex");
      $('.wr__firstname').val($(".first-name").val());
      $('.wr__lastname').val($(".last-name").val());
      $('.wr__email').val($(".email").val());
      $('.wr__phone').val(fullphonenumber3);

      dataLayer.push({
        'event': 'new_webinar_registration_form_submitted',
        'webinar_name': (document.querySelector('.webinar__lightbox-title').innerHTML)
      });

      if ($('.is_exit_intent_popup').val() == "On Scroll") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_scroll',
          'eventAction': 'exit_intent_scroll',
          'eventLabel': 'form submitted'
        });
      }

      if ($('.is_exit_intent_popup').val() == "Browser Tab") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_browser_tab_close_gesture',
          'eventAction': 'exit_intent_browser_tab_close_gesture',
          'eventLabel': 'form submitted'
        });
      }

      pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/340hd4j/");

      $('.webinar__registration-form1').submit();
      $('.webinar__registration-form1-block').hide();
      setTimeout(function () {
        $('.webinar__registration-form2-block').show();
        $('.webinar__loadingbar').hide();
      }, 200);

    }
    $("input:radio[name='start-date']:first").attr("checked", true);
    $('.wr__event-start-time').val($("input:radio[name='start-date']:first").val());
    $('.wr__event-end-time').val($("input:radio[name='start-date']:first").data('endtime'));
    $('.wr__invitee-start-time').val($("input:radio[name='start-date']:first").data('invitee_starttime'));
    $('.wr__invitee-end-time').val($("input:radio[name='start-date']:first").data('invitee_endtime'));
    $('.webinar-lead-type').val($("input:radio[name='start-date']:first").data('webinar_lead_type'));
  });

  $('.bc__btn-select-webinar-slot').click(function (e) {
    e.preventDefault();
    setHiddenFields();

    let fullphonenumber3 = int_phone3.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(fullphonenumber3);
    $(".tno1").val(fullphonenumber3);

    $(".first-name, .last-name, .phone, .email").keypress(function () {
      $('.first-name-error, .last-name-error,.email-id-error,.phone-error').addClass('hide');
    });

    $(".first-name, .last-name, .phone, .email").focus(function () {
      $('.first-name-error, .last-name-error,.email-id-error,.phone-error').addClass('hide');
    });

    //let active_visit = read_cookie("v_latest");
    let name_regex = new RegExp("^[a-zA-Z ]+$");
    let email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;

    if (
      ($(".first-name").val().length == 0) &&
      ($(".last-name").val().length == 0) &&
      ($(".email").val().length == 0) &&
      ($(".phone").val().length == 0)) {
      //$('.first-name, .last-name, .email, .phone').addClass('input-error');
      $('.first-name-error, .last-name-error,.email-id-error,.phone-error').removeClass('hide');
    }
    else if (!name_regex.test($(".first-name").val()) || $(".first-name").val().length == 0) {
      $('.first-name-error').removeClass('hide');
    } else if (!name_regex.test($(".last-name").val()) || $(".last-name").val().length == 0) {
      $('.last-name-error').removeClass('hide');
    } else if (!phone_regex.test($(".phone").val()) || $(".phone").val().length == 0) {
      $('.phone-error').removeClass('hide');
    } else if (!email_regex.test($(".email").val()) || $(".email").val().length == 0) {
      $('.email-id-error').removeClass('hide');
    } else {
      $('.webinar__loadingbar').css("display", "flex");
      $('.wr__firstname').val($(".first-name").val());
      $('.wr__lastname').val($(".last-name").val());
      $('.wr__email').val($(".email").val());
      $('.wr__phone').val(fullphonenumber3);

      dataLayer.push({
        'event': 'new_webinar_registration_form_submitted',
        'webinar_name': (document.querySelector('.webinar__lightbox-title').innerHTML)
      });

      if ($('.is_exit_intent_popup').val() == "On Scroll") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_scroll',
          'eventAction': 'exit_intent_scroll',
          'eventLabel': 'form submitted'
        });
      }

      if ($('.is_exit_intent_popup').val() == "Browser Tab") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_browser_tab_close_gesture',
          'eventAction': 'exit_intent_browser_tab_close_gesture',
          'eventLabel': 'form submitted'
        });
      }

      pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/340hd4j/");

      $('.webinar__registration-form1').submit();
      $('.webinar__registration-form1-block').hide();
      setTimeout(function () {
        $('.webinar__registration-form2-block').show();
        $('.webinar__loadingbar').hide();
      }, 200);

    }
    $("input:radio[name='start-date']:first").attr("checked", true);
    $('.wr__event-start-time').val($("input:radio[name='start-date']:first").val());
    $('.wr__event-end-time').val($("input:radio[name='start-date']:first").data('endtime'));
    $('.wr__invitee-start-time').val($("input:radio[name='start-date']:first").data('invitee_starttime'));
    $('.wr__invitee-end-time').val($("input:radio[name='start-date']:first").data('invitee_endtime'));
    $('.webinar-lead-type').val($("input:radio[name='start-date']:first").data('webinar_lead_type'));
  });

  $('.bc__btn-select-webinar-slot-v2').click(function (e) {
    e.preventDefault();
    setHiddenFields();

    let fullphonenumber3 = int_phone3.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(fullphonenumber3);
    $(".tno1").val(fullphonenumber3);

    $(".full-name,.email,.phone").keypress(function () {
      $('.full-name-error,.email-id-error,.phone-error').addClass('hide');
    });

    $(".full-name, .email, .phone").focus(function () {
      $('.full-name-error,.email-id-error,.phone-error').addClass('hide');
    });

    //let active_visit = read_cookie("v_latest");
    let name_regex = new RegExp("^[a-zA-Z ]+$");
    let email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;

    if (
      ($(".full-name").val().length == 0) &&
      ($(".email").val().length == 0) &&
      ($(".phone").val().length == 0)) {
      $('.full-name-error,.email-id-error,.phone-error').removeClass('hide');
    } else if (!name_regex.test($(".full-name").val()) || $(".full-name").val().length == 0) {
      $('.full-name-error').removeClass('hide');
    } else if (!phone_regex.test($(".phone").val()) || $(".phone").val().length == 0) {
      $('.phone-error').removeClass('hide');
    } else if (!email_regex.test($(".email").val()) || $(".email").val().length == 0) {
      $('.email-id-error').removeClass('hide');
    } else {
      $('.webinar__loadingbar').css("display", "flex");
      let fullname = $(".full-name").val();

      if (fullname.substring(0, fullname.indexOf(' ')) == '') {
        $('.wr__firstname').val(fullname.substring(fullname.indexOf(' ') + 1));
        $('.wr__lastname').val("IK");
      } else if (fullname.substring(fullname.indexOf(' ') + 1) == '') {
        $('.wr__firstname').val(fullname.substring(0, fullname.indexOf(' ')));
        $('.wr__lastname').val(fullname.substring(0, fullname.indexOf(' ')));
      } else {
        $('.wr__firstname').val(fullname.substring(0, fullname.indexOf(' ')));
        $('.wr__lastname').val(fullname.substring(fullname.indexOf(' ') + 1));
      }
      $('.wr__email').val($(".email").val());
      $('.wr__phone').val(fullphonenumber3);

      dataLayer.push({
        'event': 'new_webinar_registration_form_submitted',
        'webinar_name': (document.querySelector('.webinar__lightbox-title').innerHTML)
      });

      if ($('.is_exit_intent_popup').val() == "On Scroll") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_scroll',
          'eventAction': 'exit_intent_scroll',
          'eventLabel': 'form submitted'
        });
      }

      if ($('.is_exit_intent_popup').val() == "Browser Tab") {
        dataLayer.push({
          'event': 'exit_intent',
          'eventCategory': 'exit_intent_browser_tab_close_gesture',
          'eventAction': 'exit_intent_browser_tab_close_gesture',
          'eventLabel': 'form submitted'
        });
      }
      pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/340hd4j/");

      $('.webinar__registration-form1').submit();
      $('.webinar__registration-form1-block').hide();
      setTimeout(function () {
        $('.webinar__registration-form2-block').show();
        $('.webinar__loadingbar').hide();
      }, 200);

    }
    $("input:radio[name='start-date']:first").attr("checked", true);
    $('.wr__event-start-time').val($("input:radio[name='start-date']:first").val());
    $('.wr__event-end-time').val($("input:radio[name='start-date']:first").data('endtime'));
    $('.wr__invitee-start-time').val($("input:radio[name='start-date']:first").data('invitee_starttime'));
    $('.wr__invitee-end-time').val($("input:radio[name='start-date']:first").data('invitee_endtime'));
    $('.webinar-lead-type').val($("input:radio[name='start-date']:first").data('webinar_lead_type'));
  });

  $('.bc__upworth-next').click(function (e) {
    e.preventDefault();
    let expSelected = $('.gql-exp-select').val();
    let domainSelected = $('.gql-domain-select').val();

    if (expSelected == "") {
      $('.work-exp-error').removeClass('hide');
    } else if (domainSelected == "") {
      $('.domain-error').removeClass('hide');
    } else {
      $('.gql-work-experience').val(expSelected);
      $('.gql-role-domain').val(domainSelected);
      $('.webinar__registration-form1-block-s1').hide();
      $('.webinar__registration-form1-block-s2').show();
    }
  });

  $('.bc__upworth-step2').click(function (e) {
    e.preventDefault();
    setHiddenFields();
    let expSelected = $('.gql-exp-select').val();
    let domainSelected = $('.gql-domain-select').val();

    let fullphonenumber3 = int_phone3.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(fullphonenumber3);
    $(".tno1").val(fullphonenumber3);

    $(".first-name, .last-name, .phone, .email").keypress(function () {
      $('.first-name-error, .last-name-error,.email-id-error,.phone-error').addClass('hide');
    });

    $(".first-name, .last-name, .phone, .email").focus(function () {
      $('.first-name-error, .last-name-error,.email-id-error,.phone-error').addClass('hide');
    });

    //let active_visit = read_cookie("v_latest");
    let name_regex = new RegExp("^[a-zA-Z ]+$");
    let email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;

    if (
      ($(".first-name").val().length == 0) &&
      ($(".last-name").val().length == 0) &&
      ($(".email").val().length == 0) &&
      ($(".phone").val().length == 0)) {
      //$('.first-name, .last-name, .email, .phone').addClass('input-error');
      $('.first-name-error, .last-name-error,.email-id-error,.phone-error').removeClass('hide');
    }
    else if (!name_regex.test($(".first-name").val()) || $(".first-name").val().length == 0) {
      $('.first-name-error').removeClass('hide');
    } else if (!name_regex.test($(".last-name").val()) || $(".last-name").val().length == 0) {
      $('.last-name-error').removeClass('hide');
    } else if (!phone_regex.test($(".phone").val()) || $(".phone").val().length == 0) {
      $('.phone-error').removeClass('hide');
    } else if (!email_regex.test($(".email").val()) || $(".email").val().length == 0) {
      $('.email-id-error').removeClass('hide');
    } else {
      $('.webinar__loadingbar').css("display", "flex");

      dataLayer.push({
        'event': 'new_webinar_registration_form_submitted',
        'webinar_name': (document.querySelector('.webinar__lightbox-title').innerHTML)
      });

      pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/3hp515j/");
      $('.profile-analysis-step1').submit();
      setTimeout(function () {
        location.href = "/upworth" + window.location.search + "&domain=" + domainSelected + "&workexp=" + expSelected + "&email=" + $('.email').val() + "&fname=" + $('.first-name').val() + "&lname=" + $('.last-name').val() + "&phone=" + $('.phone').val();
      }, 200);

    }
  });

  $('.bc__btn-2nd-step').click(function (e) {
    e.preventDefault();
    if ($("input:radio[name='start-date']").is(":checked")) {
      let estarttime = $('input[name="start-date"]:checked').val();
      let eendtime = $('input[name="start-date"]:checked').data('endtime');
      let utmm = visitor_id + ":" + v_country;
      let sf_uuid = v_timezone + ":learn.ik" + cta_lp + ":learn.ik" + getCookie("ik-landingpage-v2");
      let utmstring = "?utm_source=" + $('.utm_source').val() + "&assigned_to=Interview Kickstart&invitee_first_name=" + $('.wr__firstname').val() + "&invitee_last_name=" + $('.wr__lastname').val() + "&invitee_email=" + $('.wr__email').val() + "&answer_1=" + $('.wr__phone').val() + "&event_start_time=" + estarttime + "&event_end_time=" + eendtime + "&utm_medium=" + utmm + "&salesforce_uuid=" + sf_uuid;

      let finalurl;

      if ($('.bye-calendly-type').val() == "NoPhoneInTheFirstStep") {
        finalurl = "https://www.interviewkickstart.com/signup-final-step-v6" + utmstring;
      } else {
        finalurl = "https://www.interviewkickstart.com/signup-final-step" + utmstring;
      }
      $('.wr__event-start-time').val(estarttime);
      $('.wr__event-end-time').val(eendtime);
      $('.wr__invitee-start-time').val($("input[name='start-date']:checked").data('invitee_starttime'));
      $('.wr__invitee-end-time').val($("input[name='start-date']:checked").data('invitee_endtime'));
      $('.webinar-lead-type').val($("input[name='start-date']:checked").data('webinar_lead_type'));
      $('.webinar__loadingbar').show();

      pushToEndPoint("https://hooks.zapier.com/hooks/catch/11068981/340hl1a/");

      $('.webinar__registration-form2').submit();

      bake_cookie("v_history", "");
      bake_cookie("v_latest", "");

      if (singlesignup != true) {
        setTimeout(function () {
          location.href = finalurl;
        }, 800);
      } else {
        $('.webinar__loadingbar').hide();
        $('.webinar__registration-form2-block').hide();
        $('.webinar__registration-form3-block').show();
      }
    }
  });
});
