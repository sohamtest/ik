<script>
var visitor_id,int_phone,v_city="",v_ccode="",v_timezone=Intl.DateTimeFormat().resolvedOptions().timeZone,iksite_url=window.location.hostname;
$(document).ready(function(){
  $.getJSON("https://get.geojs.io/v1/ip/geo.json",function(t){}).done(function(t){v_city=t.city,v_ccode=t.country_code}).fail(function(t){});const t=new Date;var e=["January","February","March","April","May","June","July","August","September","October","November","December"];1<=t.getDate()&&t.getDate()<=25?($(".cohort-month").html(e[t.getMonth()]+" "+t.getFullYear()),$(".cohort-month-full").html(e[t.getMonth()-1]+" "+t.getFullYear())):($(".cohort-month").html(e[t.getMonth()+1]+" "+t.getFullYear()),$(".cohort-month-full").html(e[t.getMonth()]+" "+t.getFullYear()));
  $(".cohort-month").html("January 2022");$(".cohort-month-full").html("December 2021");
	$('.calendly-popup, .direct-link').click(function(){
        showCalendly();
     });
});

</script>

<script defer src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/intlTelInput.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script>
<script>window.cookieconsent.initialise({palette:{popup:{background:"#3996d2",text:"#ffffff"},button:{background:"#00d1b4",text:"#ffffff"}},theme:"classic",content:{message:"We use cookies to enable the best possible experience on our site and to optimize the content for you. If you continue surfing you agree.",href:"https://www.interviewkickstart.com/privacy-policy"}});</script>

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
  
  $('.calendly-link-widget').click(function(){
    
    var active_visit = read_cookie("v_latest");
    var visit_history = read_cookie("v_history");
    
    var utm_medium_str="";
		
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
    
    utm_medium_str = utm_medium_str + ":" + visitor_id.toString().replace(/"/g, "");
    
    var utm_campaign="",utm_source="",utm_content="",utm_term="";
    
    for (const property in active_visit) {
      if (`${property}` == "utm_campaign") {
        utm_campaign = `${active_visit[property]}`;
      }
    }
    
    for (const property in active_visit) {
      if (`${property}` == "utm_source") {
        utm_source = `${active_visit[property]}`;
      }
    }
    
    for (const property in active_visit) {
      if (`${property}` == "utm_content") {
        utm_content = `${active_visit[property]}`;
      }
    }
    
    for (const property in active_visit) {
      if (`${property}` == "utm_term") {
        utm_term = `${active_visit[property]}`;
      }
    }

    Calendly.initPopupWidget({
      url: 'https://calendly.com/interviewkickstart/enrollment-workshop',
      utm: {
        utmCampaign: utm_campaign,
        utmSource: utm_source,
        utmMedium: utm_medium_str,
        utmContent: utm_content,
        utmTerm: utm_term
      }         
    });
    
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

        setTimeout(function(){
          location.href = calendlyurl;
        }, 100);

      }
    });  
    
    return false;
  });
  
  function showCalendly(){
    var curl = generateCalendlyLink()+"&hide_event_type_details=1";
    Calendly.initPopupWidget({
      url: curl
    });
  }
  
  $('.lpv5-home-form').click(function(e) {
  		e.preventDefault();
    
    	 var formstr = '&first_name=' + $("#lpv5-fname").val()
        + '&last_name=' + $("#lpv5-lname").val()
        + '&a1=' + $("#lpv5-phone").val() 
        + '&email=' + $("#lpv5-email").val();
            
    	calendlySignup(true, formstr);
  });
  
  $('.request-info-close').click(function(e){
  	$('.request-info-wrap').css("display","none");
    $('.request-info-wrap').css("opacity",0);
  });
  
  $('.btn-webinar-popup').click(function(e){
    
    e.preventDefault();
    
    $('.request-info-wrap').css("display","flex");
    $('.request-info-wrap').css("opacity",1);
    
    let page_url = window.location.pathname;
    let visit_history = read_cookie("v_history");
    
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
          }
        });   
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
    	+ '&salesforce_uuid=' + v_timezone;
    
    	$('#wc_utm_source').val(active_visit['utm_source']);
    	$('#wc_utm_medium').val(active_visit['utm_medium']);
    	$('#wc_utm_campaign').val(active_visit['utm_campaign']);
    	$('#wc_gclid').val(active_visit['gclid']);
    	$('#wc_msclkid').val(active_visit['msclkid']);
    	$('#wc_timezone').val(v_timezone);
    	$('#wc_page_url').val(window.location.pathname);
    	$('#wc_user_id').val(visitor_id);
    	
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
  
  function generateCalendlyLink(){
        var calendlyurl= "https://calendly.com/interviewkickstart/enrollment-workshop?";
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

        for (const property in active_visit) {
            var ptyn = `${active_visit[property]}`;

            if( (`${property}` != "utm_medium") && (`${property}` != "msclkid") && (`${property}` != "fbclid") && (`${property}` != "gclid") ){
                calendlyurl = calendlyurl+`${property}`+"="+`${active_visit[property]}`+"&";
            }
        }
		    
        utm_medium_str = utm_medium_str + "&salesforce_uuid="+v_timezone;
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
            setTimeout(function(){
              location.href = calendlyurl;
              $('.loading-overlay').css('display', 'none');
            }, 100);
          }
        });    	
  }
</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-54935903-1%22%3E"></script>

<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-54935903-1', {
    'user_id': visitor_id
  });
</script>

<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P335R9N"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
