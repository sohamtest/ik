$(document).ready(function () {
    let exitIntentBCpopup = getCookie("exitIntentBCpopup");
    console.log("exitIntentBCpopup 1:"+exitIntentBCpopup);
    
    if(exitIntentBCpopup != "false"){
        setCookie("exitIntentBCpopup","false");
        exitIntentBCpopup = true;
    }else{
        exitIntentBCpopup = false;
    }
    console.log("exitIntentBCpopup 2:"+exitIntentBCpopup);
    
        // scrolling
        let prevScrollpos = window.pageYOffset;
        window.addEventListener("scroll", function () {
            let currentScrollPos = window.pageYOffset;

            // Check if the scroll position is 1 rem or less
            //console.log(currentScrollPos, prevScrollpos)
            if(exitIntentBCpopup){
                console.log("exitIntentBCpopup 3:"+exitIntentBCpopup);
                if (prevScrollpos > currentScrollPos && (prevScrollpos - currentScrollPos) >= 400) {
                    $('.webinar__lightbox').css('display','flex');
                    dataLayer.push({
                        'event': 'exit_intent_bye_calendly_popup',
                        'eventCategory': 'exit_intent_bye_calendly_popup',
                        'eventAction': 'exit_intent_bye_calendly_popup',
                        'eventLabel': 'Form triggered on scroll'
                    });
                    exitIntentBCpopup = false;
                }

                if (currentScrollPos > prevScrollpos)
                prevScrollpos = currentScrollPos
            }
        });
 

    $(document).mouseleave(function () {
        if(exitIntentBCpopup){
            console.log("exitIntentBCpopup 4:"+exitIntentBCpopup);
            $('.webinar__lightbox').css('display','flex');
            dataLayer.push({
                'event': 'exit_intent_bye_calendly_popup',
                'eventCategory': 'exit_intent_bye_calendly_popup',
                'eventAction': 'exit_intent_bye_calendly_popup',
                'eventLabel': 'Form triggered on exit intent'
            });
            exitIntentBCpopup = false;
        }
    });
});
