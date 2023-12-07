/**
 * Original file: gh/sohamtest/ik@AnkurDev/ep-webinar-us.v7.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var experiment_type, exitintent_freecourse, v_timezone_formatted, interviewPrepURL, switchUpURL, hybrid;
$(document).ready((function () {
  var e;

  function t(e) {
    const t = new Date(e) - new Date;
    return Math.floor(t / 864e5)
  }

  function a(e) {
    const a = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let n = getAllUrlParams();
    if (null != n.startdate && null != n.enddate) {
      let t = (r = n.startdate, s = n.enddate, l = e, r = new Date(r), s = new Date(s), $.grep(l, (function (e) {
        var t = new Date(e.utc_start_time);
        return t >= r && t <= s
      })));
      e = 0 == t.length ? e : t
    }
    var r, s, l;
    0 == e.length ? registration_type = "calendly" : registration_type = "byecalendly";
    let o = e.length > 6 ? 6 : e.length;
    $(".webinar__slots").empty();
    for (i = 0; i < o; i++) {
      var _ = 10007 * Number(e[i].day) % 50 + 10007 * t(e[i].start_time) % 50 * 3;
      let n = e[i].invitee_end_time.substring(0, 7),
        r = n.length - 2,
        s = [n.slice(0, r), " ", n.slice(r)].join("");
      var d = e[i].weekday + ", " + e[i].day + " " + a[parseInt(e[i].month) - 1] + " " + e[i].year + " | " + e[i].hour + ":" + e[i].minute + " " + e[i].am_or_pm,
        m = '<label class="select-webinar-slot w-radio"><input type="radio" name="start-date" value="' + e[i].start_time + '" data-endtime="' + e[i].end_time + '" data-invitee_starttime="' + e[i].invitee_start_time + '" data-invitee_endtime="' + e[i].invitee_end_time + '" data-name="' + e[i].start_time + '" class="w-form-formradioinput select-webinar-radio-btn w-radio-input" data-webinar_lead_type="' + e[i].webinar_lead_type + '"><span class="w-form-label" for="start-date-' + i + '">' + d + "</span></label>",
        c = '<div class="ws-card"><div class="ws-card__day">' + e[i].weekday.substring(0, 3) + '</div><div class="slot-status-grid"><div class="ws-card__date">' + e[i].day + '</div><div class="ws-almost-full">Almost full!</div></div><div class="form-slot-block"><label class="form-radio-btn-block-slot w-radio"><div class="w-form-formradioinput w-form-formradioinput--inputType-custom ws-card__time-card w-radio-input"></div><input style="opacity:0;position:absolute;z-index:-1" type="radio" name="start-date" value="' + e[i].start_time + '" data-endtime="' + e[i].end_time + '" data-invitee_starttime="' + e[i].invitee_start_time + '" data-invitee_endtime="' + e[i].invitee_end_time + '" data-name="' + e[i].start_time + '" data-webinar_lead_type="' + e[i].webinar_lead_type + '"><span class="slod-text-hide w-form-label" for="radio-10">' + e[i].invitee_start_time.substring(0, 7) + "-" + e[i].invitee_end_time.substring(0, 7) + '</span></label><div class="slot-time-block"><div class="ws-time">' + e[i].invitee_start_time.substring(0, 5) + " - " + s + '</div><div class="slot-available-grid"><div>Available Slots -</div><div class="ws-available-slots red">' + _ + "</div></div></div></div></div>";
      "v2" == webinarUI ? ($(".webinar__slots").append($(c)), $(".webinar__slots").addClass("slot-grid"), $(".ws-available-slots").css("color", "#0E9F1C"), $(".ws-card:first-child").find(".ws-available-slots").css("color", "#D14040"), $(".ws-card:nth-child(2)").find(".ws-available-slots").css("color", "#ED7735"), $(".ws-card").find(".ws-almost-full").hide(), $(".ws-card:first-child").find(".ws-almost-full").show(), $(".ws-card:nth-child(2)").find(".ws-almost-full").text("Filling fast!").addClass("ws-filling-fast"), $(".ws-filling-fast").css("display", "block")) : $(".webinar__slots").append($(m))
    }
  }

  function n(e, t) {
    if (console.log("webinarType: " + webinarType), v_timezone_formatted = t.replace("+", "%2B"), webinarType = null == webinarType || "REGULAR" == webinarType ? "REGULAR" : "SWITCH_UP", console.log("webinarType4: " + webinarType), "No" == isSwitchUp) {
      let t = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=" + e + "&program=Backend&timezone=" + v_timezone_formatted + "&type=" + webinarType,
        n = new XMLHttpRequest;
      n.open("GET", t, !0), n.setRequestHeader("Authorization", "1Cgx6oYXkOlWkNDn7_tXO");
      var i = (new Date).toString().match(/\((.+)\)/);
      i[1].includes(" ") && (i = i[1].split(" ").map((([e]) => e)).join("")), n.onload = function () {
        if (200 == this.status) {
          let e = JSON.parse(this.response);
          e = "SWITCH_UP" == webinarType ? e.map((e => ({
            ...e,
            webinar_lead_type: "SWITCH_UP"
          }))) : e.map((e => ({
            ...e,
            webinar_lead_type: "REGULAR"
          }))), a(e)
        } else registration_type = "calendly"
      }, n.onerror = function () {
        registration_type = "calendly"
      }, n.send()
    } else interviewPrepURL = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=" + e + "&program=Backend&timezone=" + v_timezone_formatted + "&type=REGULAR", switchUpURL = "https://uplevel.interviewkickstart.com/api/webinar-slot/upcoming-slots/?country=" + e + "&program=Backend&timezone=" + v_timezone_formatted + "&type=SWITCH_UP", async function () {
      try {
        let e = await r(interviewPrepURL),
          t = await r(switchUpURL);
        e = e.map((e => ({
          ...e,
          webinar_lead_type: "REGULAR"
        }))), t = t.map((e => ({
          ...e,
          webinar_lead_type: "SWITCH_UP"
        })));
        const a = [...e];
        for (const e of t) {
          const t = a.findIndex((t => t.day === e.day)); - 1 !== t && a.splice(t, 1), a.push(e)
        }
        return a.sort(((e, t) => new Date(e.start_time) - new Date(t.start_time))), a
      } catch (e) {
        console.error("Error:", e)
      }
    }().then((e => {
      console.log(e), a(e)
    }))
  }
  async function r(e) {
    const t = await fetch(e, {
      headers: {
        Authorization: "1Cgx6oYXkOlWkNDn7_tXO"
      }
    });
    return await t.json()
  }

  function s(e) {
    let t;
    t = "SWITCH_UP" == webinarType ? "Future-proof your career with AI/ ML, Data Science" : "CAREER_SESSION" == webinarType ? "AI Advantage: Strategies to secure more interviews" : "How to Nail your next Technical Interview";
    var a = {
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
      event_name: t,
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
      "Invitee End Time": $(".wr__invitee-end-time").val()
    };
    $.ajax({
      type: "POST",
      url: e,
      data: a,
      success: function (e) {
        "success" == e.status && console.log("Form submitted successfully!")
      }
    })
  }
  $(".webinar-lightbox-close").click((function (e) {
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
  })), $.getJSON("https://get.geojs.io/v1/ip/geo.json", (function (e) { })).done((function (e) {
    let t = getAllUrlParams();
    "IND" == e.country_code3 && null == t.forceuswebinar ? (TimerHandler("IST"), n("IND", e.timezone)) : (TimerHandler("America/New_York"), n("USA", e.timezone))
  })).fail((function (e) {
    TimerHandler("America/New_York"), n("USA", "US/Pacific")
  })), $(".tab-switchup").click((function () {
    webinarType = "SWITCH_UP";
    let e = "India" == v_country ? "IND" : "USA";
    $("html, body").animate({
      scrollTop: 0
    }, "slow"), $(".webinar__slots").empty(), console.log("webinarType2" + webinarType), n(e, v_timezone)
  })), $(".tab-regular").click((function () {
    webinarType = "REGULAR";
    let e = "India" == v_country ? "IND" : "USA";
    $("html, body").animate({
      scrollTop: 0
    }, "slow"), $(".webinar__slots").empty(), console.log("webinarType3" + webinarType), n(e, v_timezone)
  })), "NoPhoneInTheFirstStep" != $(".bye-calendly-type").val() && null != document.querySelector("#webinar_pnumber") && (e = window.intlTelInput(document.querySelector("#webinar_pnumber"), {
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
  })), $(".bc__btn-select-webinar-slot-v2").click((function (e) {
    e.preventDefault(), setHiddenFields(), $(".first-name, .last-name, .email").keypress((function () {
      $(".first-name-error, .last-name-error,.email-id-error").addClass("hide")
    })), $(".first-name, .last-name, .email").focus((function () {
      $(".first-name-error, .last-name-error,.email-id-error").addClass("hide")
    }));
    let t = new RegExp("^[a-zA-Z ]+$");
    0 == $(".first-name").val().length && 0 == $(".last-name").val().length && 0 == $(".email").val().length ? $(".first-name-error, .last-name-error,.email-id-error").removeClass("hide") : t.test($(".first-name").val()) && 0 != $(".first-name").val().length ? t.test($(".last-name").val()) && 0 != $(".last-name").val().length ? /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length ? ($(".webinar__loadingbar").css("display", "flex"), $(".wr__firstname").val($(".first-name").val()), $(".wr__lastname").val($(".last-name").val()), $(".wr__email").val($(".email").val()), dataLayer.push({
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
    }), s("https://hooks.zapier.com/hooks/catch/11068981/34c9jjz/"), $(".webinar__registration-form1").submit(), $(".webinar__registration-form1-block").hide(), setTimeout((function () {
      $(".webinar__registration-form2-block").show(), $(".webinar__loadingbar").hide()
    }), 200)) : $(".email-id-error").removeClass("hide") : $(".last-name-error").removeClass("hide") : $(".first-name-error").removeClass("hide"), $("input:radio[name='start-date']:first").attr("checked", !0), $(".wr__event-start-time").val($("input:radio[name='start-date']:first").val()), $(".wr__event-end-time").val($("input:radio[name='start-date']:first").data("endtime")), $(".wr__invitee-start-time").val($("input:radio[name='start-date']:first").data("invitee_starttime")), $(".wr__invitee-end-time").val($("input:radio[name='start-date']:first").data("invitee_endtime")), $(".webinar-lead-type").val($("input:radio[name='start-date']:first").data("webinar_lead_type"))
  })), $(".bc__btn-newsletter-subscription").click((function (e) {
    e.preventDefault(), setHiddenFields();
    $(".email").keypress((function () {
      $(".email-id-error").addClass("hide")
    })), $(".email").focus((function () {
      $(".email-id-error").addClass("hide")
    })), /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length ? ($(".wr__emailid").val($(".email").val()), s("https://hooks.zapier.com/hooks/catch/11068981/3tvfocs/"), $(".webinar__loadingbar").css("display", "flex"), $(".newsletter-subscription-form1").submit(), $(".newsletter-form-step1").hide(), $(".webinar__lightbox-subtitle").text("Thank you for signing up to our newsletter. You can also sign up for our webinar for a session on getting into the best tech companies."), $(".webinar__lightbox-title").text("How to nail your next tech interview"), setTimeout((function () {
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
    let i = new RegExp("^[a-zA-Z ]+$");
    0 == $(".first-name").val().length && 0 == $(".last-name").val().length && 0 == $(".phone").val().length ? $(".first-name-error, .last-name-error,.phone-error").removeClass("hide") : i.test($(".first-name").val()) && 0 != $(".first-name").val().length ? i.test($(".last-name").val()) && 0 != $(".last-name").val().length ? /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test($(".phone").val()) && 0 != $(".phone").val().length ? ($(".webinar__loadingbar").css("display", "flex"), $(".wr__firstname").val($(".first-name").val()), $(".wr__lastname").val($(".last-name").val()), $(".wr__email").val($(".email").val()), $(".wr__phone").val(a), dataLayer.push({
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
  })), $(".bc__btn-select-webinar-slot").click((function (e) {
    e.preventDefault(), setHiddenFields(), $(".full-name,.email").keypress((function () {
      $(".full-name-error,.email-id-error").addClass("hide")
    })), $(".full-name, .email").focus((function () {
      $(".full-name-error,.email-id-error").addClass("hide")
    }));
    let t = new RegExp("^[a-zA-Z ]+$");
    if (0 == $(".full-name").val().length && 0 == $(".email").val().length) $(".full-name-error,.email-id-error").removeClass("hide");
    else if (t.test($(".full-name").val()) && 0 != $(".full-name").val().length)
      if (/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length) {
        $(".webinar__loadingbar").css("display", "flex");
        let e = $(".full-name").val();
        "" == e.substring(0, e.indexOf(" ")) ? ($(".wr__firstname").val(e.substring(e.indexOf(" ") + 1)), $(".wr__lastname").val("IK")) : "" == e.substring(e.indexOf(" ") + 1) ? ($(".wr__firstname").val(e.substring(0, e.indexOf(" "))), $(".wr__lastname").val(e.substring(0, e.indexOf(" ")))) : ($(".wr__firstname").val(e.substring(0, e.indexOf(" "))), $(".wr__lastname").val(e.substring(e.indexOf(" ") + 1))), $(".wr__email").val($(".email").val()), dataLayer.push({
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
        }), $(".webinar__registration-form1").submit(), $(".webinar__registration-form1-block").hide(), setTimeout((function () {
          $(".webinar__registration-form2-block").show(), $(".webinar__loadingbar").hide()
        }), 200)
      } else $(".email-id-error").removeClass("hide");
    else $(".full-name-error").removeClass("hide");
    $("input:radio[name='start-date']:first").attr("checked", !0), $(".wr__event-start-time").val($("input:radio[name='start-date']:first").val()), $(".wr__event-end-time").val($("input:radio[name='start-date']:first").data("endtime")), $(".wr__invitee-start-time").val($("input:radio[name='start-date']:first").data("invitee_starttime")), $(".wr__invitee-end-time").val($("input:radio[name='start-date']:first").data("invitee_endtime")), $(".webinar-lead-type").val($("input:radio[name='start-date']:first").data("webinar_lead_type"))
  })), $(".bc__upworth-next").click((function (e) {
    e.preventDefault();
    let t = $(".gql-exp-select").val(),
      a = $(".gql-domain-select").val();
    "" == t ? $(".work-exp-error").removeClass("hide") : "" == a ? $(".domain-error").removeClass("hide") : ($(".gql-work-experience").val(t), $(".gql-role-domain").val(a), $(".webinar__registration-form1-block-s1").hide(), $(".webinar__registration-form1-block-s2").show())
  })), $(".bc__upworth-step2").click((function (e) {
    e.preventDefault(), setHiddenFields();
    let t = $(".gql-exp-select").val(),
      a = $(".gql-domain-select").val();
    $(".first-name, .last-name, .email").keypress((function () {
      $(".first-name-error, .last-name-error,.email-id-error").addClass("hide")
    })), $(".first-name, .last-name, .email").focus((function () {
      $(".first-name-error, .last-name-error,.email-id-error").addClass("hide")
    }));
    let i = new RegExp("^[a-zA-Z ]+$");
    0 == $(".first-name").val().length && 0 == $(".last-name").val().length && 0 == $(".email").val().length ? $(".first-name-error, .last-name-error,.email-id-error").removeClass("hide") : i.test($(".first-name").val()) && 0 != $(".first-name").val().length ? i.test($(".last-name").val()) && 0 != $(".last-name").val().length ? /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(".email").val()) && 0 != $(".email").val().length ? ($(".webinar__loadingbar").css("display", "flex"), dataLayer.push({
      event: "new_webinar_registration_form_submitted",
      webinar_name: document.querySelector(".webinar__lightbox-title").innerHTML
    }), s("https://hooks.zapier.com/hooks/catch/11068981/3hp515j/"), $(".profile-analysis-step1").submit(), setTimeout((function () {
      location.href = "/upworth-profile-analysis?domain=" + a + "&workexp=" + t + "&email=" + $(".email").val() + "&fname=" + $(".first-name").val() + "&lname=" + $(".last-name").val()
    }), 200)) : $(".email-id-error").removeClass("hide") : $(".last-name-error").removeClass("hide") : $(".first-name-error").removeClass("hide")
  })), $(".bc__btn-2nd-step").click((function (e) {
    e.preventDefault();
    let t = getAllUrlParams();
    if ($("input:radio[name='start-date']").is(":checked")) {
      let e, a = $('input[name="start-date"]:checked').val(),
        i = $('input[name="start-date"]:checked').data("endtime"),
        n = visitor_id + ":" + v_country,
        r = v_timezone + ":ik.com" + cta_lp + ":ik.com" + getCookie("ik-landingpage-v2"),
        l = (window.location.search, ""),
        o = "?utm_source=" + $(".utm_source").val() + "&assigned_to=Interview Kickstart&invitee_first_name=" + $(".wr__firstname").val() + "&invitee_last_name=" + $(".wr__lastname").val() + "&invitee_email=" + $(".wr__email").val() + "&answer_1=" + $(".wr__phone").val() + "&event_start_time=" + a + "&event_end_time=" + i + "&utm_medium=" + n + "&salesforce_uuid=" + r + "&forceuswebinar=" + t.forceuswebinar + l;
      e = "NoPhoneInTheFirstStep" == $(".bye-calendly-type").val() ? "https://www.interviewkickstart.com/signup-final-step-v6" + o : "https://www.interviewkickstart.com/signup-final-step" + o, $(".wr__event-start-time").val(a), $(".wr__event-end-time").val(i), $(".wr__invitee-start-time").val($("input[name='start-date']:checked").data("invitee_starttime")), $(".wr__invitee-end-time").val($("input[name='start-date']:checked").data("invitee_endtime")), $(".webinar-lead-type").val($("input[name='start-date']:checked").data("webinar_lead_type")), $(".webinar__loadingbar").show(), s("https://hooks.zapier.com/hooks/catch/11068981/34cq9f8/"), $(".webinar__registration-form2").submit(), bake_cookie("v_history", ""), bake_cookie("v_latest", ""), 1 != singlesignup ? setTimeout((function () {
        location.href = e
      }), 800) : ($(".webinar__loadingbar").hide(), $(".webinar__registration-form2-block").hide(), $(".webinar__registration-form3-block").show())
    }
  }))
}));
//# sourceMappingURL=/sm/2f0e64bcdc790f606952da29e902459bd1d65541c94a172a9e6d5cea23de78b1.map