<script>
/* Backup taken on 15 Sep 2022 */
  var visitor_id,int_phone,v_country="",v_city="",v_ccode="",v_timezone=Intl.DateTimeFormat().resolvedOptions().timeZone,iksite_url=window.location.hostname;
  $(document).ready(function(){
    $('input[name="poptinDesignInputTextFieldText_2"]').val("Front-end");
    $('.stats__enrolled-engineers').text("13K+");
    $('.stats__salary-hike-range').text("$50K - $200K");
    $('.stats__years-of-traning').text("7");
    $('.stats__highest-offers').text("18");
    $('.stats__instructors').text("500+");
    $('.stats__highest-compensation').text("$1.2M");

  	$.ajax({
        url: "https://assets.calendly.com/assets/external/widget.js",
        dataType: "script",
        cache: true
    });
  
  $.getJSON("https://get.geojs.io/v1/ip/geo.json",function(t){}).done(function(t){v_city=t.city,v_ccode=t.country_code, v_country=t.country, setHiddenFields();}).fail(function(t){});
	$('.calendly-popup, .direct-link, .btn-webinar-popup, .lpv5-home-form, .calendly-link-widget').click(function(){
        showCalendly("v1");
     });
    
    $('.direct-link-v2').click(function(){
        showCalendly("v2");
     });
  
  	let c_now = new Date();
  	const c_date = new Date();
    const c_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    if( (c_date.getDate() >= 1) && (c_date.getDate() <= 25)){
      	$('.cohort-month').html(c_months[c_date.getMonth()] +" "+ c_date.getFullYear());
      	$('.cohort-month-full').html(c_months[c_date.getMonth()-1] +" "+ c_date.getFullYear());
    }else{
      if(c_date.getMonth() == 11){
        c_now.setMonth(12);
        $('.cohort-month-full').html(c_months[c_date.getMonth()] +" "+ c_date.getFullYear());
        $('.cohort-month').html(c_months[c_now.getMonth()] +" "+ c_now.getFullYear());
      }else if(c_date.getMonth() == 0){
      	c_now.setMonth(-1);
        $('.cohort-month-full').html(c_months[c_date.getMonth()] +" "+ c_date.getFullYear());
        $('.cohort-month').html(c_months[c_now.getMonth()] +" "+ c_now.getFullYear());
      }else{
      	$('.cohort-month-full').html(c_months[c_date.getMonth()] +" "+ c_date.getFullYear());
        $('.cohort-month').html(c_months[c_date.getMonth()+1] +" "+ c_date.getFullYear());
      }
    }    
  	
  	var hubspot_url = generateCalendlyLink("hubspot");
  	let domel = '<div class="meetings-iframe-container" data-src="'+hubspot_url+'"></div>';
    $(".letstalk-hubspot").append(domel);
  	$.getScript("https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js");
  
});
</script>

<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script>
<script>window.cookieconsent.initialise({palette:{popup:{background:"#3996d2",text:"#ffffff"},button:{background:"#00d1b4",text:"#ffffff"}},theme:"classic",content:{message:"We use cookies to enable the best possible experience on our site and to optimize the content for you. If you continue surfing you agree.",href:"https://www.interviewkickstart.com/privacy-policy"}});</script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/intlTelInput.min.js"></script>

<script>
  function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var utmobj = {};
    if (queryString) {
      queryString = queryString.split('#')[0];
      var arr = queryString.split('&');
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=');
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
        paramName = paramName.toLowerCase();
        if (paramName.match(/\[(\d+)?\]$/)) {
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!utmobj[key]) utmobj[key] = [];
          if (paramName.match(/\[\d+\]$/)) {
            var index = /\[(\d+)\]/.exec(paramName)[1];
            utmobj[key][index] = paramValue;
          } else {
            utmobj[key].push(paramValue);
          }
        } else {
          if (!utmobj[paramName]) {
            utmobj[paramName] = paramValue;
          } else if (utmobj[paramName] && typeof utmobj[paramName] === 'string'){
            utmobj[paramName] = [utmobj[paramName]];
            utmobj[paramName].push(paramValue);
          } else {
            utmobj[paramName].push(paramValue);
          }
        }
      }
    }
    return utmobj;
  }
    
  function create_UUID() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }
 
  var visitor_id = getCookie("unique_visitor_id6");
  
  var expdate = new Date();
  expdate.setTime(expdate.getTime()+(365*24*60*60*1000));
  
  if(visitor_id == ""){
    setCookie("unique_visitor_id6",create_UUID());
    visitor_id = getCookie("unique_visitor_id6");
  }
 
  var referrer =  document.referrer;
  var cta_lp = window.location.pathname;
  
  if((referrer != "") && (referrer.indexOf(window.location.host.toString()) == -1) && (referrer.indexOf("calendly.com") == -1)){
    
    if(window.location.pathname == '/'){
    	setCookie("ik-landingpage-v2",'/home');
    }else{
    	setCookie("ik-landingpage-v2",window.location.pathname);
    }
  	
  }
  
  var utm_params_url;
  let calendly_param = getAllUrlParams();
  $("#iksiteurl").val(iksite_url);
  
  if(calendly_param['invitee_first_name'] != undefined){
    $("#invitee_first_name").val(decodeURIComponent(calendly_param['invitee_first_name']));
    $("#invitee_last_name").val(decodeURIComponent(calendly_param['invitee_last_name']));
    $("#invitee_email").val(decodeURIComponent(calendly_param['invitee_email']));
    $("#answer_1").val(decodeURIComponent(calendly_param['answer_1']));
    $("#utm_source").val(decodeURIComponent(calendly_param['utm_source']));
    $("#utm_medium").val(decodeURIComponent(calendly_param['utm_medium']));
    $("#utm_campaign").val(decodeURIComponent(calendly_param['utm_campaign']));
    $("#salesforce_uuid").val(decodeURIComponent(calendly_param['salesforce_uuid']));
    $("#gclid").val(decodeURIComponent(calendly_param['gclid']));
    $("#msclkid").val(decodeURIComponent(calendly_param['msclkid']));
    $("#fbclid").val(decodeURIComponent(calendly_param['fbclid']));
    $("#event_start_time").val(decodeURIComponent(calendly_param['event_start_time']));
    $("#event_end_time").val(decodeURIComponent(calendly_param['event_end_time']));
    $("#user_id").val(visitor_id);
    
    utm_params_url = {};
  }
  else{
  	utm_params_url = getAllUrlParams();
  }
  
  if(utm_params_url['gh_jid'] != undefined){
  	utm_params_url = {};
    $('.careers-sec1, .careers-sec2, .careers-sec3, .careers-sec4,.section.hero-careers-sec, .career-section, .life-ik, .we-were-here-section, .ik-member, .ik-talks, .careers-imgages, .our-values, .careers-sec7, .who-we-are, .careers-sec6, .careers-sec5, .careers-sec4, .life-ik, .careers-sec3, .careers-sec2, .careers-sec1').hide();
  }
  
  let isEmpty = jQuery.isEmptyObject(utm_params_url);
  let r_visit = read_cookie("v_latest");
  
  if(isEmpty && (r_visit == null)){
  	bake_organic_cookie();
  }
  else if(!isEmpty && (r_visit == null)){
  	bake_cookie("v_latest", utm_params_url);
    
    if(referrer == null || referrer.indexOf(window.location.host.toString()) == -1)
    bake_cookie_history("v_history", utm_params_url);
  }
  else if(isEmpty && (r_visit != null)){
  	if(r_visit['utm_source'] != "Organic") {
      bake_organic_cookie();
    }
  }
  else{
    if(!isDuplicateCookie(utm_params_url, r_visit)){
      bake_cookie("v_latest", utm_params_url);
      
      if(referrer == null || referrer.indexOf(window.location.host.toString()) == -1)
      bake_cookie_history("v_history", utm_params_url);
    }
  }
  
  function isCookieSizeExceeded(){
  	let c_size = 15;
    var h_cookie = read_cookie("v_history");
    
    if (h_cookie == null) return;
    
    if(h_cookie.length >= c_size){
      h_cookie.shift();	
      bake_cookie("v_history", h_cookie);
    }
  }
  
  function isDuplicateCookie(utm_params, recent_visit){    
    if((utm_params['utm_source'] == recent_visit['utm_source']) && 
       (utm_params['utm_medium'] == recent_visit['utm_medium']) && 
       (utm_params['utm_campaign'] == recent_visit['utm_campaign']) && 
       (utm_params['utm_adset'] == recent_visit['utm_adset']) && 
       (utm_params['utm_content'] == recent_visit['utm_content']) && 
       (utm_params['utm_term'] == recent_visit['utm_term']) && 
       (utm_params['fbclid'] == recent_visit['fbclid']))    
    {
      return true;
    }
    else{return false;}
  }
  
  function bake_cookie_history(name, value) {
    
    isCookieSizeExceeded();
    
    var visits_history = [];
    var iksutmhistory = read_cookie(name);
    
    if(iksutmhistory == "" || iksutmhistory == null){
      	
      var utmstring = value;
      utmstring.timestamp = $.now();
      visits_history.push(utmstring);
      
      var cookie = [name, '=', JSON.stringify(visits_history), ';expires','=', expdate.toGMTString(), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
      document.cookie = cookie;
    }
    else
    {
    	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
   		result && (result = JSON.parse(result[1]));
      	
      	var newhistoryobj = result.push(value); 

      	var cookie = [name, '=', JSON.stringify(result), ';expires','=', expdate.toGMTString(), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    	document.cookie = cookie;
    }
  }
  
  function bake_organic_cookie(){
    var organicobj = {
       "utm_source":"Organic",
       "utm_medium":"",
       "utm_campaign":"",
       "utm_adset":"",
       "utm_content":"",
       "utm_term":"",
       "timestamp":$.now()};

   		if(referrer == null || referrer.indexOf(window.location.host.toString()) == -1){
    		bake_cookie_history("v_history", organicobj);
        	bake_cookie("v_latest", organicobj);
        }
  }
  
  function bake_cookie(name, value) {
    var utmstring = value;
    utmstring.timestamp = $.now();
    var cookie = [name, '=', JSON.stringify(utmstring), ';expires','=', expdate.toGMTString(),'; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
  }
  
  function read_cookie(name) {
   var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
   result && (result = JSON.parse(result[1]));
   return result;
  }
  
  function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function showCalendly(cv){
    var curl = generateCalendlyLink("calendly",cv)+"&hide_event_type_details=1";
    Calendly.initPopupWidget({
      url: curl
    });
  }
  
  $('.request-info-close').click(function(e){
  	$('.request-info-wrap').css("display","none");
    $('.request-info-wrap').css("opacity",0);
  });

  
  $('.form-to-calendly').click(function(e) {
  		e.preventDefault();
    	
    	var active_visit = read_cookie("v_latest");
    
    	var full_phone_number = int_phone.getNumber(intlTelInputUtils.numberFormat.E164);
      	$("input[name='phone_number[full]'").val(full_phone_number);
    
    	 var formstr = '&first_name=' + $("#wcalendly-fname").val()
        + '&last_name=' + $("#wcalendly-lname").val()
        + '&a1=' + full_phone_number
        + '&email=' + encodeURIComponent($("#wcalendly-email").val())
    	+ '&salesforce_uuid='+ v_timezone +":learn.ik"+cta_lp+":learn.ik"+getCookie("ik-landingpage");
    
    	$('.utm_source').val(active_visit['utm_source']);
    	$('.utm_medium').val(active_visit['utm_medium']);
    	$('.utm_campaign').val(active_visit['utm_campaign']);
    	$('.gclid').val(active_visit['gclid']);
    	$('.msclkid').val(active_visit['msclkid']);
    	$('.timezone').val(v_timezone);
    	$('.page_url').val(window.location.pathname);
    	$('.user_id').val(visitor_id);
    	$('.salesforce_uuid').val(v_timezone +":learn.ik"+cta_lp+":learn.ik"+getCookie("ik-landingpage"));
        
    	var name_regex = new RegExp("^[a-zA-Z ]+$");
      	var email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    	var phone_regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;
    	
     	$( "#wcalendly-fname" ).keypress(function() {
          $('.fname-error').addClass('hide');
        });
    	
        $( "#wcalendly-lname" ).keypress(function() {
          $('.lname-error').addClass('hide');
        });
          
        $( "#wcalendly_pnumber" ).keypress(function() {
          $('.mobile-error').addClass('hide');
        });
          
        $( "#wcalendly-email" ).keypress(function() {
          $('.email-error').addClass('hide');
        });
        
        $( "#wcalendly-fname, #wcalendly-lname, #wcalendly-email, #wcalendly_pnumber" ).focus(function() {
      		$('.fname-error, .lname-error, .email-error, .mobile-error').addClass('hide');
    	});
    	    	
    	if( 
            ($("#wcalendly-fname").val().length == 0) &&
            ($("#wcalendly-lname").val().length == 0) &&
            ($("#wcalendly-email").val().length == 0) &&
            ($("#wcalendly_pnumber").val().length == 0)){
             $('.fname-error, .lname-error, .email-error, .mobile-error').removeClass('hide');
        }
    	else if (!name_regex.test($("#wcalendly-fname").val()) || $("#wcalendly-fname").val().length == 0){
            $('.fname-error').removeClass('hide');
        }else if (!name_regex.test($("#wcalendly-lname").val()) || $("#wcalendly-lname").val().length == 0){
        	$('.lname-error').removeClass('hide');
        }else if (!email_regex.test($("#wcalendly-email").val()) || $("#wcalendly-email").val().length == 0){
        	$('.email-error').removeClass('hide');
        }else if(!phone_regex.test($("#wcalendly_pnumber").val()) || $("#wcalendly_pnumber").val().length == 0){
          $('.mobile-error').removeClass('hide');
        }else{
        	$(".leadcapturing-form").submit();
          	calendlySignup(true,formstr);
        }
	});
  
  function generateCalendlyLink(platform,cv){
    
    	var calendlyurl;
    
    	if(platform == "hubspot"){
          	calendlyurl = "https://meetings.hubspot.com/ik/requestacallback?embed=true&";
        }else{
        	//calendlyurl = "https://calendly.com/interviewkickstart/enrollment-workshop?";
          if(cv == "v2"){
          	calendlyurl = "https://calendly.com/team-ik/how-to-nail-your-next-interview-dsw?";
          }else{
          	calendlyurl = "https://calendly.com/interviewkickstart/enrollment-workshop?";
          }
        }
    
    	var active_visit = read_cookie("v_latest");
    	var visit_history = read_cookie("v_history");
    	var gaid = getCookie("_ga");
    	visitor_id = visitor_id + gaid;
    	var utm_medium_str = "utm_medium=";
		
        for (const property in active_visit) {
            if (`${property}` == "utm_medium") {
                utm_medium_str = utm_medium_str + `${active_visit[property]}`;
            }
        }

        utm_medium_str = utm_medium_str + ":";
		    
        for (const property in active_visit) {
            if (`${property}` == "gclid") {
                utm_medium_str = utm_medium_str + "gclid:" + `${active_visit[property]}`;
            } else if (`${property}` == "msclkid") {
                utm_medium_str = utm_medium_str + "msclkid:" + `${active_visit[property]}`;
            } else if (`${property}` == "fbclid") {
                utm_medium_str = utm_medium_str + "fbclid:" + `${active_visit[property]}`;
            }
        }

        if ( (utm_medium_str.indexOf("gclid") == -1) && (utm_medium_str.indexOf("msclkid") == -1) && (utm_medium_str.indexOf("fbclid") == -1)){
            utm_medium_str = utm_medium_str + ":";
        }
		
        utm_medium_str = utm_medium_str + ":" + visitor_id;
    	utm_medium_str = utm_medium_str + ":" + v_country;

        for (const property in active_visit) {
            var ptyn = `${active_visit[property]}`;

            if( (`${property}` != "utm_medium") && (`${property}` != "msclkid") && (`${property}` != "fbclid") && (`${property}` != "gclid") ){
                calendlyurl = calendlyurl+`${property}`+"="+`${active_visit[property]}`+"&";
            }
        }
		    
        //utm_medium_str = utm_medium_str + "&salesforce_uuid="+v_timezone;
        utm_medium_str = utm_medium_str + "&salesforce_uuid="+v_timezone +":learn.ik"+cta_lp+":learn.ik"+getCookie("ik-landingpage-v2");

        calendlyurl = calendlyurl + utm_medium_str;
    	return calendlyurl;
    	
  }
  
  function calendlySignup(isthisForm,formstr) {
    	    
    	$('.loading-overlay').css('display', 'flex');
    
    	let calendlyurl = generateCalendlyLink();
    	var visit_history = read_cookie("v_history");
    
    	if(isthisForm){
        	calendlyurl = calendlyurl + formstr;
        }
        
    	let page_url = window.location.pathname;
      	var jsonData = {"unique_visitor_id": visitor_id.toString().replace(/"/g, ""), "device_name": "", "page_url": page_url, "visitor_city": v_city, "click_history":JSON.stringify(visit_history)};
		
    	$.ajax({
          type: "POST",
          url: "https://hooks.zapier.com/hooks/catch/9555768/ong6g6o/",
          data: jsonData,
          success: function (e) {
            if(e.status == "success"){
              bake_cookie("v_history","");
              bake_cookie("v_latest","");
            }
            
            setCookie("ik-landingpage-v2","");
            
            setTimeout(function(){
              location.href = calendlyurl;
              $('.loading-overlay').css('display', 'none');
            }, 100);
          }
        });    	
  }
  
  function setHiddenFields(){
      let params = getAllUrlParams();
      $('.utm_source').val(decodeURIComponent((params['utm_source'] != undefined) ? params['utm_source'] : "Organic"));
      $('.utm_medium').val(decodeURIComponent((params['utm_medium'] != undefined) ? params['utm_medium'] : ""));
      $('.utm_campaign').val(decodeURIComponent((params['utm_campaign'] != undefined) ? params['utm_campaign'] : ""));
      $('.utm_adset').val(decodeURIComponent((params['utm_adset'] != undefined) ? params['utm_adset'] : ""));
      $('.utm_content').val(decodeURIComponent((params['utm_content'] != undefined) ? params['utm_content'] : ""));
      $('.utm_term').val(decodeURIComponent((params['utm_term'] != undefined) ? params['utm_term'] : ""));
      $('.user_timezone').val(v_timezone);
      $('.page_url').val(window.location.href);
      $('.site_url').val(window.location.hostname);
      $('.v_country').val(v_country);
      $('.user_id').val(visitor_id);
      $('.gclid').val(decodeURIComponent((params['gclid'] != undefined) ? params['gclid'] : ""));
      $('.salesforce_uuid').val(decodeURIComponent((params['salesforce_uuid'] != undefined) ? params['salesforce_uuid'] : ""));
      $('.msclkid').val(decodeURIComponent((params['msclkid'] != undefined) ? params['msclkid'] : ""));
      $('.fbclid').val(decodeURIComponent((params['fbclid'] != undefined) ? params['fbclid'] : ""));
      $(".iksiteurl").val(window.location.hostname);
      $(".cta_page_url").val("learn.ik"+cta_lp);
      $(".l_page_url").val("learn.ik"+getCookie("ik-landingpage-v2"));
  }
</script>
