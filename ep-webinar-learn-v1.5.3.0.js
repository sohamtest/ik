/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /gh/kothinti/ik@master/ep-webinar-learn-v1.5.3.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var experiment_type, exitintent_freecourse, v_timezone_formatted, interviewPrepURL, switchUpURL;

function getDeviceType() {
  var e = navigator.userAgent;
  return /mobile/i.test(e) ? "Mobile" : /iPad|Android|Touch/i.test(e) ? "Tablet" : "Desktop"
}
$(document).ready((function () {
  var e;
  let t = getAllUrlParams();
  async function a(e) {
    const t = await fetch(e, {
      headers: {
        Authorization: "1Cgx6oYXkOlWkNDn7_tXO"
      }
    });
    return await t.json()
  }

  function n(e) {
    const t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    0 == e.length ? registration_type = "calendly" : registration_type = "byecalendly";
    let a = e.length > 6 ? 6 : e.length;
    for (i = 0; i < a; i++) {
      var n = e[i].weekday + ", " + e[i].day + " " + t[parseInt(e[i].month) - 1] + " " + e[i].year + " | " + e[i].hour + ":" + e[i].minute + " " + e[i].am_or_pm,
        r = '<label class="select-webinar-slot w-radio"><input type="radio" name="start-date" value="' + e[i].start_time + '" data-endtime="' + e[i].end_time + '" data-invitee_starttime="' + e[i].invitee_start_time + '" data-invitee_endtime="' + e[i].invitee_end_time + '" data-name="' + e[i].start_time + '" class="w-form-formradioinput select-webinar-radio-btn w-radio-input" data-webinar_lead_type="' + e[i].webinar_lead_type + '"><span class="w-form-label" for="start-date-' + i + '">' + n + "</span></label>";
      $(".webinar__slots").append($(r))
    }
  }
  "CAREER_SESSION" == webinarType ? null != t.event ? ($(".webinar__lightbox-title").text(decodeURIComponent(t.event)), $('input[name="Event Name"]').val(decodeURIComponent(t.event)), eventName = decodeURIComponent(t.event)) : ($(".webinar__lightbox-title").text("Seize the AI Advantage: Strengthen Your Resume"), $('input[name="Event Name"]').val("Seize the AI Advantage: Strengthen Your Resume"), eventName = "Seize the AI Advantage: Strengthen Your Resume") : "SWITCH_UP" == webinarType ? null != t.event ? ($(".webinar__lightbox-title").text(decodeURIComponent(t.event)), $('input[name="Event Name"]').val(decodeURIComponent(t.event)), eventName = decodeURIComponent(t.event)) : ($(".webinar__lightbox-title").text("Future-proof your career with AI/ ML, Data Science"), $('input[name="Event Name"]').val("Future-proof your career with AI/ ML, Data Science"), eventName = "Future-proof your career with AI/ ML, Data Science") : null != t.event ? ($(".webinar__lightbox-title").text(decodeURIComponent(t.event)), $('input[name="Event Name"]').val(decodeURIComponent(t.event)), eventName = decodeURIComponent(t.event)) : ($(".webinar__lightbox-title").text("How to Nail your next Technical Interview"), $('input[name="Event Name"]').val("How to Nail your next Technical Interview"), eventName = "How to Nail your next Technical Interview"), $(".webinar-lightbox-close").click((function (e) {
    "ExitIntent" == experiment_type ? ($(".webinar__lightbox-card").css("display", "none"), $(".webinar__lightbox-exit-intent").css("display", "block")) : 1 == exitintent_freecourse ? ($(".webinar__lightbox-card").css("display", "none"), $(".webinar__lightbox-free-course").css("display", "block"), $(".exitintent-fc-email").val($(".email").val()), dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_free_course",
      eventAction: "exit_intent_free_course",
      eventLabel: "form triggered"
    })) : ($(".webinar__lightbox").css("display", "none"), $("body").css("overflow", "auto"), "On Scroll" == $(".is_exit_intent_popup").val() && dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_scroll",
      eventAction: "exit_intent_scroll",
      eventLabel: "close"
    }), "Browser Tab" == $(".is_exit_intent_popup").val() && dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_browser_tab_close_gesture",
      eventAction: "exit_intent_browser_tab_close_gesture",
      eventLabel: "close"
    }))
  })), $(".btn-getaccess").click((function (e) {
    e.preventDefault();
    $(".exitintent-fc-email").keypress((function () {
      $(".exitintent-fc-email-error").addClass("hide")
    })), $(".exitintent-fc-email").focus((function () {
      $(".exitintent-fc-email-error").addClass("hide")
    })), /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".exitintent-fc-email").val()) && 0 != $(".exitintent-fc-email").val().length ? ($(".exit-intent-free-course-form").submit(), dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_free_course",
      eventAction: "exit_intent_free_course",
      eventLabel: "form submitted"
    }), $(".webinar-lightbox-exitintent-freecourse-close").hide(), setTimeout((function () {
      $(".webinar__lightbox").css("display", "none"), $(".webinar__lightbox-free-course").css("display", "none"), $(".webinar__lightbox-card").css("display", "flex"), $("body").css("overflow", "auto"), $(".exit-intent-free-course-form").css("display", "block"), $(".success-message-9").css("display", "none"), $(".webinar-lightbox-exitintent-freecourse-close").show()
    }), 2e3)) : $(".exitintent-fc-email-error").removeClass("hide")
  })), $(".webinar-lightbox-exitintent-freecourse-close").click((function (e) {
    $(".webinar__lightbox").css("display", "none"), $(".webinar__lightbox-free-course").css("display", "none"), $(".webinar__lightbox-card").css("display", "flex"), $("body").css("overflow", "auto"), dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_free_course",
      eventAction: "exit_intent_free_course",
      eventLabel: "close"
    })
  })), $(".bc-popup-cta1").click((function (e) {
    $(".webinar__lightbox-card").css("display", "flex"), $(".webinar__lightbox-exit-intent").css("display", "none")
  })), $(".bc-popup-cta2").click((function (e) {
    $(".webinar__lightbox-card").css("display", "flex"), $(".webinar__lightbox-exit-intent").css("display", "none"), $(".webinar__lightbox").css("display", "none"), $("body").css("overflow", "auto")
  }));
  let r = v_timezone.replace("+", "%2B"),
    l = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=USA&program=Backend&timezone=" + r + "&type=" + webinarType;
  if ("No" == isSwitchUp) {
    let e = new XMLHttpRequest;
    e.open("GET", l, !0), e.setRequestHeader("Authorization", "1Cgx6oYXkOlWkNDn7_tXO");
    var o = (new Date).toString().match(/\((.+)\)/);
    o[1].includes(" ") && (o = o[1].split(" ").map((([e]) => e)).join("")), e.onload = function () {
      if (200 == this.status) {
        let e = JSON.parse(this.response);
        0 == e.length ? registration_type = "calendly" : registration_type = "byecalendly", e = "SWITCH_UP" == webinarType ? e.map((e => ({
          ...e,
          webinar_lead_type: "SWITCH_UP"
        }))) : "CAREER_SESSION" == webinarType ? e.map((e => ({
          ...e,
          webinar_lead_type: "CAREER_SESSION"
        }))) : e.map((e => ({
          ...e,
          webinar_lead_type: "REGULAR"
        }))), n(e)
      } else registration_type = "calendly"
    }, e.onerror = function () {
      registration_type = "calendly"
    }, e.send()
  } else interviewPrepURL = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=USA&program=Backend&timezone=" + r + "&type=REGULAR", switchUpURL = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=USA&program=Backend&timezone=" + r + "&type=SWITCH_UP", async function () {
    try {
      let e = await a(interviewPrepURL),
        t = await a(switchUpURL);
      e = e.map((e => ({
        ...e,
        webinar_lead_type: "REGULAR"
      }))), t = t.map((e => ({
        ...e,
        webinar_lead_type: "SWITCH_UP"
      })));
      const n = [...e];
      for (const e of t) {
        const t = n.findIndex((t => t.day === e.day)); - 1 !== t && n.splice(t, 1), n.push(e)
      }
      return n.sort(((e, t) => new Date(e.start_time) - new Date(t.start_time))), n
    } catch (e) {
      console.error("Error:", e)
    }
  }().then((e => {
    console.log(e), n(e)
  }));

  function s(e) {
    var t = {
      "First Name": $(".wr__firstname").val(),
      "Last Name": $(".wr__lastname").val(),
      "Email Address": $(".wr__email").val(),
      ByeCalendlyType: $(".bye-calendly-type").val(),
      "webinar-type": $(".webinar-type").val(),
      "Webinar Lead Type": $(".webinar-lead-type").val(),
      utm_source: $(".utm_source").val(),
      utm_medium: $(".utm_medium").val(),
      utm_campaign: $(".utm_campaign").val(),
      utm_content: $(".utm_content").val(),
      utm_adset: $(".utm_adset").val(),
      utm_term: $(".utm_term").val(),
      City: $(".wr__city").val(),
      Device: $(".wr__device").val(),
      Referrer: $(".wr__referrer").val(),
      Region: $(".wr__region").val(),
      gclid: $(".gclid").val(),
      msclkid: $(".msclkid").val(),
      fbclid: $(".fbclid").val(),
      user_id: $(".user_id").val(),
      cta_page_url: $(".cta_page_url").val(),
      landing_page_url: $(".l_page_url").val(),
      event_name: eventName,
      user_timezone: $(".user_timezone").val(),
      page_url: $(".page_url").val(),
      site_url: $(".site_url").val(),
      v_country: $(".v_country").val(),
      salesforce_uuid: $(".salesforce_uuid").val(),
      phone_number_full: $(".tno1").val(),
      is_exit_intent_popup: $(".is_exit_intent_popup").val(),
      "Event Start Time": $(".wr__event-start-time").val(),
      "Event End Time": $(".wr__event-end-time").val(),
      "Invitee Start Time": $(".wr__invitee-start-time").val(),
      "Invitee End Time": $(".wr__invitee-end-time").val(),
      "Work Experience": $(".gql-work-experience").val(),
      "Domain or Role": $(".gql-role-domain").val()
    };
    $.ajax({
      type: "POST",
      url: e,
      data: t,
      success: function (e) {
        "success" == e.status && console.log("Form submitted successfully!")
      }
    })
  }
  "NoPhoneInTheFirstStep" != $(".bye-calendly-type").val() && null != document.querySelector("#webinar_pnumber") && (e = window.intlTelInput(document.querySelector("#webinar_pnumber"), {
    initialCountry: "auto",
    geoIpLookup: function (e) {
      $.get("https://get.geojs.io/v1/ip/country.json", (function () { }), "json").always((function (t) {
        var a = t && t.country ? t.country : "us";
        e(a)
      }))
    },
    hiddenInput: "full",
    utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js"
  })), $(".btn-back-to-step1").click((function (e) {
    $(".webinar__registration-form1").show(), $(".webinar__registration-success").hide(), $(".webinar__registration-form1-block").show(), $(".webinar__registration-form2-block").hide()
  })), $(".bc__btn-newsletter-subscription").click((function (e) {
    e.preventDefault(), setHiddenFields();
    $(".email").keypress((function () {
      $(".email-id-error").addClass("hide")
    })), $(".email").focus((function () {
      $(".email-id-error").addClass("hide")
    })), /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length ? ($(".wr__emailid").val($(".email").val()), s("https://hooks.zapier.com/hooks/catch/11068981/3tvfocs/"), $(".webinar__loadingbar").css("display", "flex"), $(".newsletter-subscription-form1").submit(), $(".newsletter-form-step1").hide(), setTimeout((function () {
      $(".webinar__registration-form1-block").show(), $(".webinar__loadingbar").hide()
    }), 200)) : $(".email-id-error").removeClass("hide")
  })), $(".bc__btn-select-webinar-slot-newsletter").click((function (t) {
    t.preventDefault(), setHiddenFields();
    let a = e.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(a), $(".tno1").val(a), $(".first-name, .last-name, .phone").keypress((function () {
      $(".first-name-error, .last-name-error,.phone-error").addClass("hide")
    })), $(".first-name, .last-name, .phone").focus((function () {
      $(".first-name-error, .last-name-error,.phone-error").addClass("hide")
    }));
    let n = new RegExp("^[a-zA-Z ]+$");
    0 == $(".first-name").val().length && 0 == $(".last-name").val().length && 0 == $(".phone").val().length ? $(".first-name-error, .last-name-error,.phone-error").removeClass("hide") : n.test($(".first-name").val()) && 0 != $(".first-name").val().length ? n.test($(".last-name").val()) && 0 != $(".last-name").val().length ? /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test($(".phone").val()) && 0 != $(".phone").val().length ? ($(".webinar__loadingbar").css("display", "flex"), $(".wr__firstname").val($(".first-name").val()), $(".wr__lastname").val($(".last-name").val()), $(".wr__email").val($(".email").val()), $(".wr__phone").val(a), dataLayer.push({
      event: "new_webinar_registration_form_submitted",
      webinar_name: document.querySelector(".webinar__lightbox-title").innerHTML
    }), "On Scroll" == $(".is_exit_intent_popup").val() && dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_scroll",
      eventAction: "exit_intent_scroll",
      eventLabel: "form submitted"
    }), "Browser Tab" == $(".is_exit_intent_popup").val() && dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_browser_tab_close_gesture",
      eventAction: "exit_intent_browser_tab_close_gesture",
      eventLabel: "form submitted"
    }), s("https://hooks.zapier.com/hooks/catch/11068981/340hd4j/"), $(".webinar__registration-form1").submit(), $(".webinar__registration-form1-block").hide(), setTimeout((function () {
      $(".webinar__registration-form2-block").show(), $(".webinar__loadingbar").hide()
    }), 200)) : $(".phone-error").removeClass("hide") : $(".last-name-error").removeClass("hide") : $(".first-name-error").removeClass("hide"), $("input:radio[name='start-date']:first").attr("checked", !0), $(".wr__event-start-time").val($("input:radio[name='start-date']:first").val()), $(".wr__event-end-time").val($("input:radio[name='start-date']:first").data("endtime")), $(".wr__invitee-start-time").val($("input:radio[name='start-date']:first").data("invitee_starttime")), $(".wr__invitee-end-time").val($("input:radio[name='start-date']:first").data("invitee_endtime")), $(".webinar-lead-type").val($("input:radio[name='start-date']:first").data("webinar_lead_type"))
  })), $(".bc__btn-select-webinar-slot").click((function (t) {
    t.preventDefault(), setHiddenFields();
    let a = e.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(a), $(".tno1").val(a), $(".first-name, .last-name, .phone, .email").keypress((function () {
      $(".first-name-error, .last-name-error,.email-id-error,.phone-error").addClass("hide")
    })), $(".first-name, .last-name, .phone, .email").focus((function () {
      $(".first-name-error, .last-name-error,.email-id-error,.phone-error").addClass("hide")
    }));
    let n = new RegExp("^[a-zA-Z ]+$");
    0 == $(".first-name").val().length && 0 == $(".last-name").val().length && 0 == $(".email").val().length && 0 == $(".phone").val().length ? $(".first-name-error, .last-name-error,.email-id-error,.phone-error").removeClass("hide") : n.test($(".first-name").val()) && 0 != $(".first-name").val().length ? n.test($(".last-name").val()) && 0 != $(".last-name").val().length ? /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test($(".phone").val()) && 0 != $(".phone").val().length ? /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length ? ($(".webinar__loadingbar").css("display", "flex"), $(".wr__firstname").val($(".first-name").val()), $(".wr__lastname").val($(".last-name").val()), $(".wr__email").val($(".email").val()), $(".wr__phone").val(a), dataLayer.push({
      event: "new_webinar_registration_form_submitted",
      webinar_name: document.querySelector(".webinar__lightbox-title").innerHTML
    }), "On Scroll" == $(".is_exit_intent_popup").val() && dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_scroll",
      eventAction: "exit_intent_scroll",
      eventLabel: "form submitted"
    }), "Browser Tab" == $(".is_exit_intent_popup").val() && dataLayer.push({
      event: "exit_intent",
      eventCategory: "exit_intent_browser_tab_close_gesture",
      eventAction: "exit_intent_browser_tab_close_gesture",
      eventLabel: "form submitted"
    }), s("https://hooks.zapier.com/hooks/catch/11068981/340hd4j/"), $(".webinar__registration-form1").submit(), $(".webinar__registration-form1-block").hide(), setTimeout((function () {
      $(".webinar__registration-form2-block").show(), $(".webinar__loadingbar").hide()
    }), 200)) : $(".email-id-error").removeClass("hide") : $(".phone-error").removeClass("hide") : $(".last-name-error").removeClass("hide") : $(".first-name-error").removeClass("hide"), $("input:radio[name='start-date']:first").attr("checked", !0), $(".wr__event-start-time").val($("input:radio[name='start-date']:first").val()), $(".wr__event-end-time").val($("input:radio[name='start-date']:first").data("endtime")), $(".wr__invitee-start-time").val($("input:radio[name='start-date']:first").data("invitee_starttime")), $(".wr__invitee-end-time").val($("input:radio[name='start-date']:first").data("invitee_endtime")), $(".webinar-lead-type").val($("input:radio[name='start-date']:first").data("webinar_lead_type"))
  })), $(".bc__btn-select-webinar-slot-v2").click((function (t) {
    t.preventDefault(), setHiddenFields();
    let a = e.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(a), $(".tno1").val(a), $(".full-name,.email,.phone").keypress((function () {
      $(".full-name-error,.email-id-error,.phone-error").addClass("hide")
    })), $(".full-name, .email, .phone").focus((function () {
      $(".full-name-error,.email-id-error,.phone-error").addClass("hide")
    }));
    let n = new RegExp("^[a-zA-Z ]+$");
    if (0 == $(".full-name").val().length && 0 == $(".email").val().length && 0 == $(".phone").val().length) $(".full-name-error,.email-id-error,.phone-error").removeClass("hide");
    else if (n.test($(".full-name").val()) && 0 != $(".full-name").val().length)
      if (/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test($(".phone").val()) && 0 != $(".phone").val().length)
        if (/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length) {
          $(".webinar__loadingbar").css("display", "flex");
          let e = $(".full-name").val();
          "" == e.substring(0, e.indexOf(" ")) ? ($(".wr__firstname").val(e.substring(e.indexOf(" ") + 1)), $(".wr__lastname").val("IK")) : "" == e.substring(e.indexOf(" ") + 1) ? ($(".wr__firstname").val(e.substring(0, e.indexOf(" "))), $(".wr__lastname").val(e.substring(0, e.indexOf(" ")))) : ($(".wr__firstname").val(e.substring(0, e.indexOf(" "))), $(".wr__lastname").val(e.substring(e.indexOf(" ") + 1))), $(".wr__email").val($(".email").val()), $(".wr__phone").val(a), dataLayer.push({
            event: "new_webinar_registration_form_submitted",
            webinar_name: document.querySelector(".webinar__lightbox-title").innerHTML
          }), "On Scroll" == $(".is_exit_intent_popup").val() && dataLayer.push({
            event: "exit_intent",
            eventCategory: "exit_intent_scroll",
            eventAction: "exit_intent_scroll",
            eventLabel: "form submitted"
          }), "Browser Tab" == $(".is_exit_intent_popup").val() && dataLayer.push({
            event: "exit_intent",
            eventCategory: "exit_intent_browser_tab_close_gesture",
            eventAction: "exit_intent_browser_tab_close_gesture",
            eventLabel: "form submitted"
          }), s("https://hooks.zapier.com/hooks/catch/11068981/340hd4j/"), $(".webinar__registration-form1").submit(), $(".webinar__registration-form1-block").hide(), setTimeout((function () {
            $(".webinar__registration-form2-block").show(), $(".webinar__loadingbar").hide()
          }), 200)
        } else $(".email-id-error").removeClass("hide");
      else $(".phone-error").removeClass("hide");
    else $(".full-name-error").removeClass("hide");
    $("input:radio[name='start-date']:first").attr("checked", !0), $(".wr__event-start-time").val($("input:radio[name='start-date']:first").val()), $(".wr__event-end-time").val($("input:radio[name='start-date']:first").data("endtime")), $(".wr__invitee-start-time").val($("input:radio[name='start-date']:first").data("invitee_starttime")), $(".wr__invitee-end-time").val($("input:radio[name='start-date']:first").data("invitee_endtime")), $(".webinar-lead-type").val($("input:radio[name='start-date']:first").data("webinar_lead_type"))
  })), $(".bc__upworth-next").click((function (e) {
    e.preventDefault();
    let t = $(".gql-exp-select").val(),
      a = $(".gql-domain-select").val();
    "" == t ? $(".work-exp-error").removeClass("hide") : "" == a ? $(".domain-error").removeClass("hide") : ($(".gql-work-experience").val(t), $(".gql-role-domain").val(a), $(".webinar__registration-form1-block-s1").hide(), $(".webinar__registration-form1-block-s2").show())
  })), $(".bc__upworth-step2").click((function (t) {
    t.preventDefault(), setHiddenFields();
    let a = $(".gql-exp-select").val(),
      n = $(".gql-domain-select").val(),
      i = e.getNumber(intlTelInputUtils.numberFormat.E164);
    $("input[name='phone_number[intphone_full]'").val(i), $(".tno1").val(i), $(".first-name, .last-name, .phone, .email").keypress((function () {
      $(".first-name-error, .last-name-error,.email-id-error,.phone-error").addClass("hide")
    })), $(".first-name, .last-name, .phone, .email").focus((function () {
      $(".first-name-error, .last-name-error,.email-id-error,.phone-error").addClass("hide")
    }));
    let r = new RegExp("^[a-zA-Z ]+$");
    0 == $(".first-name").val().length && 0 == $(".last-name").val().length && 0 == $(".email").val().length && 0 == $(".phone").val().length ? $(".first-name-error, .last-name-error,.email-id-error,.phone-error").removeClass("hide") : r.test($(".first-name").val()) && 0 != $(".first-name").val().length ? r.test($(".last-name").val()) && 0 != $(".last-name").val().length ? /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test($(".phone").val()) && 0 != $(".phone").val().length ? /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length ? ($(".webinar__loadingbar").css("display", "flex"), dataLayer.push({
      event: "new_webinar_registration_form_submitted",
      webinar_name: document.querySelector(".webinar__lightbox-title").innerHTML
    }), s("https://hooks.zapier.com/hooks/catch/11068981/3hp515j/"), $(".profile-analysis-step1").submit(), setTimeout((function () {
      location.href = "/upworth" + window.location.search + "&domain=" + n + "&workexp=" + a + "&email=" + $(".email").val() + "&fname=" + $(".first-name").val() + "&lname=" + $(".last-name").val() + "&phone=" + $(".phone").val()
    }), 200)) : $(".email-id-error").removeClass("hide") : $(".phone-error").removeClass("hide") : $(".last-name-error").removeClass("hide") : $(".first-name-error").removeClass("hide")
  })), $(".bc__btn-2nd-step").click((function (e) {
    if (e.preventDefault(), $("input:radio[name='start-date']").is(":checked")) {
      let e, t = $('input[name="start-date"]:checked').val(),
        a = $('input[name="start-date"]:checked').data("endtime"),
        n = visitor_id + ":" + v_country,
        i = v_timezone + ":learn.ik" + cta_lp + ":learn.ik" + getCookie("ik-landingpage-v2"),
        r = "?utm_source=" + $(".utm_source").val() + "&assigned_to=Interview Kickstart&invitee_first_name=" + $(".wr__firstname").val() + "&invitee_last_name=" + $(".wr__lastname").val() + "&invitee_email=" + $(".wr__email").val() + "&answer_1=" + $(".wr__phone").val() + "&event_start_time=" + t + "&event_end_time=" + a + "&utm_medium=" + n + "&salesforce_uuid=" + i;
      e = "NoPhoneInTheFirstStep" == $(".bye-calendly-type").val() ? "https://www.interviewkickstart.com/signup-final-step-v6" + r : "https://www.interviewkickstart.com/signup-final-step" + "?utm_source=" + $(".utm_source").val() + "&utm_medium=" + n + "&salesforce_uuid=" + i, $(".wr__event-start-time").val(t), $(".wr__event-end-time").val(a), $(".wr__invitee-start-time").val($("input[name='start-date']:checked").data("invitee_starttime")), $(".wr__invitee-end-time").val($("input[name='start-date']:checked").data("invitee_endtime")), $(".webinar-lead-type").val($("input[name='start-date']:checked").data("webinar_lead_type")), $(".webinar__loadingbar").show(), s("https://hooks.zapier.com/hooks/catch/11068981/340hl1a/"), $(".webinar__registration-form2").submit(), bake_cookie("v_history", ""), bake_cookie("v_latest", ""), 1 != singlesignup ? setTimeout((function () {
        location.href = e
      }), 800) : ($(".webinar__loadingbar").hide(), $(".webinar__registration-form2-block").hide(), $(".webinar__registration-form3-block").show())
    }
  }))
}));
//# sourceMappingURL=/sm/c70c7c39d8df4599ed5307d14baa3077610c91a831d7cc6512b683f810eaf74b.map