$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 100) {
    $(".navbar-new").addClass("navbar-shadow");
  } else {
    $(".navbar-new").removeClass("navbar-shadow");
  }
});
$(document).ready(function () {
  $(".levelup-cta").click(function () {
    $(".courses__list")
      .find("a")
      .each(function () {
        $(this).attr("href", $(this).attr("href") + "?LM=1");
      });
  });
  $(".information-icon-block").mouseover(function () {
    var tooltipContent = $(this).data("tooltip");
    $(".tooltip-wrapper")
      .filter(function () {
        return $(this).data("tooltip") === tooltipContent;
      })
      .addClass("show-tooltip");
  });
  $(".information-icon-block").mouseout(function () {
    var tooltipContent = $(this).data("tooltip");
    $(".tooltip-wrapper")
      .filter(function () {
        return $(this).data("tooltip") === tooltipContent;
      })
      .removeClass("show-tooltip");
  });
  var swiper = new Swiper(".webinar-footer-slider-wrapper", {
    direction: "vertical",
    speed: 900,
    mousewheelControl: !1,
    slidesPerView: 1,
    watchSlidesProgress: !0,
    noSwiping: !0,
    noSwipingClass: "swiper-slide",
    autoHeight: !0,
    pagination: { el: ".swiper-pagination", type: "bullets", clickable: !0 },
  });
  function enablePaginationBullet(step) {
    $(".swiper-pagination-bullet")
      .eq(step)
      .addClass("swiper-pagination-bullet-enabled");
  }
  $("input[name='Question1']").change(function () {
    enablePaginationBullet(0);
  });
  $("input[name='Question2']").change(function () {
    enablePaginationBullet(1);
  });
  $("input[name='Question3']").change(function () {
    enablePaginationBullet(2);
  });
  $("input[name='time-slot']").change(function () {
    enablePaginationBullet(3);
  });
  let totalNumber = $(".swiper-pagination-bullet").length;
  $(".total-number").text(totalNumber);
  $(".swiper-pagination .swiper-pagination-bullet").on("click", function () {
    var dotIndex = $(this).index();
    swiper.slideTo(dotIndex);
    $(".current-slide").text(dotIndex + 1);
  });
  function sliderNext() {
    swiper.slideNext();
    $(".current-slide").text(swiper.activeIndex + 1);
  }
  $(".webinar-question2").on("change", function () {
    sliderNext();
  });
  $(".next-slide").on("click", function () {
    enablePaginationBullet(3);
    sliderNext();
  });
  $(".form-prev-btn2").on("click", function () {
    swiper.slidePrev();
    $(".current-slide").text(swiper.activeIndex + 1);
  });
  $(".webinar-answer").change(function () {
    $(".form_next").click();
  });
  $(".w--redirected-checked").on("click", function () {
    $(".form_next").click();
  });
  $(".finish-btn").click(function () {
    $(".form_next").click();
  });
  $(".form-prev-btn").click(function () {
    $(".form_prev").click();
  });
  function sliderAnimation() {
    var currentSlide = $(".w-slider-dot.w-active").index();
    if (currentSlide == 0) {
      $(".form_prev").addClass("disabled-prev");
    } else {
      $(".form_prev").removeClass("disabled-prev");
    }
  }
  $(".form_prev, .form_next").click(function () {
    setTimeout(() => {
      sliderAnimation();
    }, 200);
  });
});
function formatDateTime(date) {
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var yy = date.getFullYear() % 100;
  var hh = date.getHours();
  var min = date.getMinutes();
  var ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  hh = hh ? hh : 12;
  return (
    mm +
    "/" +
    dd +
    "/" +
    yy +
    " " +
    hh +
    ":" +
    (min < 10 ? "0" : "") +
    min +
    " " +
    ampm
  );
}
function webinarQuestion(GQLformData) {
  $.ajax({
    type: "POST",
    url: "https://hooks.zapier.com/hooks/catch/11068981/3zkpola/",
    data: GQLformData,
    success: function (e) {
      if (e.status == "success") {
        $(".confirmed-text").text("Thank you for booking webinar slot");
        $(".input_field-block").hide();
        $(".form_submit").hide();
        console.log("Form submitted successfully!");
      }
    },
  });
}
var int_phone2;
var int_phone3;
$(document).ready(function () {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const PhoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  int_phone2 = initializeIntlTelInput("#webinar_pnumber2");
  int_phone3 = initializeIntlTelInput("#webinar_pnumber3");
  submitForm(
    "#wf-form-Webinar-Questions-Form",
    'input[name="Email"]',
    'input[name="Phone"]',
    int_phone2,
    "#Fullname1"
  );
  submitForm(
    "#wf-form-Webinar-Questions-Form2",
    'input[name="Email1"]',
    'input[name="Phone1"]',
    int_phone3,
    "#Fullname2"
  );
  function validateEmail(emailInput, errorElement) {
    const email = $(emailInput).val();
    if (!emailRegex.test(email)) {
      $(errorElement).removeClass("hide");
      return false;
    } else {
      $(errorElement).addClass("hide");
      return true;
    }
  }
  function validateName(fullName, errorElement) {
    console.log("fullName", fullName);
    const name = $(fullName).val();
    console.log("name", name);
    if (!name) {
      $(errorElement).removeClass("hide");
      return false;
    } else {
      $(errorElement).addClass("hide");
      return true;
    }
  }
  function validatePhoneNumber(phoneInput, errorElement) {
    const phoneNumber = $(phoneInput).val();
    if (!PhoneNumberRegex.test(phoneNumber)) {
      $(errorElement).removeClass("hide");
      return false;
    } else {
      $(errorElement).addClass("hide");
      return true;
    }
  }
  $("#Email").on("input", function () {
    validateEmail("#Email", ".email-id-error");
  });
  $("#Email-4").on("input", function () {
    validateEmail("#Email-4", ".email-id-error");
  });
  $("#webinar_pnumber2").on("input", function () {
    validatePhoneNumber("#webinar_pnumber2", ".error-msg-phone");
  });
  $("#webinar_pnumber3").on("input", function () {
    validatePhoneNumber("#webinar_pnumber3", ".error-msg-phone");
  });
  $("#Fullname1").on("input", function () {
    validateName("#Fullname1", ".error-msg-name");
  });
  $("#Fullname2").on("input", function () {
    validateName("#Fullname2", ".error-msg-name");
  });
  function submitForm(
    formSelector,
    emailSelector,
    phoneSelector,
    int_phone,
    nameSelector
  ) {
    $(formSelector).submit(function (e) {
      e.preventDefault();
      let isValid = true;
      let phonewithccode = int_phone.getNumber(
        intlTelInputUtils.numberFormat.E164
      );
      console.log("nameSelector", nameSelector);
      isValid = validateName(nameSelector, ".error-msg-name") && isValid;
      isValid = validateEmail(emailSelector, ".email-id-error") && isValid;
      isValid =
        validatePhoneNumber(phoneSelector, ".error-msg-phone") && isValid;
      var currentDate = new Date();
      var formattedDateTime = formatDateTime(currentDate);
      var formattedDateTime = formatDateTime(currentDate);
      let utmparams = getAllUrlParams();
      $(".wr__fullName").val($(nameSelector).val());
      $(".wq_question1").val($('input[name="Question1"]:checked').val());
      $(".wq_question2").val($('input[name="Question2"]:checked').val());
      $(".wq_question3").val($('input[name="Question3"]:checked').val());
      $(".wq-webinar-slot").val($('input[name="time-slot"]:checked').val());
      $(".wr__event-start-time").val(
        $('input[name="time-slot"]:checked').val()
      );
      $(".wr__event-end-time").val(
        $("input[name='time-slot']:checked").attr("data-endtime")
      );
      $(".wr__invitee-start-time").val(
        $("input[name='time-slot']:checked").attr("data-invitee_starttime")
      );
      $(".wr__invitee-end-time").val(
        $("input[name='time-slot']:checked").attr("data-invitee_endtime")
      );
      $(".wq-email").val($(emailSelector).val());
      $(".iksiteurl").val(window.location.href);
      if (isValid) {
        var GQLformData = {
          "Full Name": $(".wr__fullName").val(),
          utm_source: decodeURIComponent(utmparams["utm_source"]),
          utm_medium: decodeURIComponent(utmparams["utm_medium"]),
          utm_campaign: decodeURIComponent(utmparams["utm_campaign"]),
          gclid: decodeURIComponent(utmparams["gclid"]),
          msclkid: decodeURIComponent(utmparams["msclkid"]),
          fbclid: decodeURIComponent(utmparams["fbclid"]),
          "Event Start Time": $(".wr__event-start-time").val(),
          "Event End Time": $(".wr__event-end-time").val(),
          "Invitee Start Time": $(".wr__invitee-start-time").val(),
          "Invitee End Time": $(".wr__invitee-end-time").val(),
          "Event Name": $(".wr__event_name").val(),
          user_id: visitor_id,
          user_timezone: v_timezone,
          city: $(".wr__city").val(),
          device: $(".wr__device").val(),
          region: $(".wr__region").val(),
          v_country: v_country,
          Page_Url: $(".iksiteurl").val(),
          "How can Interview Kickstart help you today?":
            $(".wq_question1").val(),
          "What is your current domain?": $(".wq_question2").val(),
          "What is your work experience?": $(".wq_question3").val(),
          "WQ Webinar Slot": $(".wq-webinar-slot").val(),
          "Webinar Lead Type": $(".webinar-lead-type").val(),
          Email: $(emailSelector).val(),
          phone_number_full: phonewithccode,
          "Zap Lead create Date": formattedDateTime,
        };
        webinarQuestion(GQLformData);
      }
    });
  }
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    var userIPAddress = data.ip;
    $.getJSON(
      "https://ipinfo.io/" + userIPAddress + "/json",
      function (locationData) {
        var vpnLocation =
          locationData.city +
          ", " +
          locationData.region +
          ", " +
          locationData.country;
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (locationData.country == "IN") {
          $(".country-timezone").text("IST");
        } else {
          $(".country-timezone").text("PST");
        }
      }
    );
  });
});
function initializeIntlTelInput(id) {
  return window.intlTelInput(document.querySelector(id), {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      $.get(
        "https://get.geojs.io/v1/ip/country.json",
        function () { },
        "json"
      ).always(function (resp) {
        var countryCode = resp && resp.country ? resp.country : "us";
        callback(countryCode);
      });
    },
    hiddenInput: "wq-phone",
    utilsScript:
      "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js",
  });
}