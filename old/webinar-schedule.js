var webinarSchedule = [
    {"date": "9/12/2022","time": "09:30:00 PM"},
    {"date": "9/13/2022","time": "05:30:00 PM"},
    {"date": "9/13/2022","time": "08:30:00 PM"},
    {"date": "9/14/2022","time": "06:00:00 PM"},
    {"date": "9/14/2022","time": "08:30:00 PM"},
    {"date": "9/15/2022","time": "05:30:00 PM"},
    {"date": "9/15/2022","time": "08:30:00 PM"},
    {"date": "9/16/2022","time": "06:00:00 PM"},
    {"date": "9/16/2022","time": "08:30:00 PM"},
    {"date": "9/18/2022","time": "05:30:00 PM"},
    {"date": "9/18/2022","time": "08:30:00 PM"}
];

// state object to keep track date
const timerState = {
    currentDate: '',
    nextDate: '',
    currentDateSec: '',
    nextDateSec: '',
};

// returns the next webinar date

function nextWebinar(currentDate, currentWebTime){
    let nextWebinarDate = '';
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomDate = tomorrow.toLocaleString('en-US', { timeZone: 'America/New_York' }).split(',')[0];
    let today = new Date();
    today = today.toLocaleString('en-US', { timeZone: 'America/New_York' }).split(',')[0];
    // console.log(tomDate);
    for (let idx = 0; idx <= webinarSchedule.length; idx++) {
        if (webinarSchedule[idx].date === currentDate) {
            const currentDateWeb = Date.parse(new Date(`${webinarSchedule[idx].date}, ${webinarSchedule[idx].time}`));
            // console.log(webinarSchedule[idx + 2]);
            if (typeof webinarSchedule[idx + 2] === 'undefined') break;

            if (currentDateWeb > currentWebTime) {
                nextWebinarDate = `${webinarSchedule[idx].date}, ${webinarSchedule[idx].time}`;
                break;
            }
        } else {
            if (webinarSchedule[idx].date == tomDate && webinarSchedule[idx + 2] != null) {
                nextWebinarDate = `${webinarSchedule[idx].date}, ${webinarSchedule[idx].time}`;
                break;
            }
        }
    }
    console.log(nextWebinarDate);
    return nextWebinarDate;
};

// initializes the state object
function initStates(){
    timerState.currentDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    timerState.currentDateSec = Date.parse(timerState.currentDate);
    timerState.nextDate = nextWebinar(timerState.currentDate.split(',')[0], timerState.currentDateSec);
    if (timerState.nextDate !== '') {
        timerState.nextDateSec = Date.parse(timerState.nextDate);
    }
};

// helper function to concatenate ones and tens
function unitCount(unit){
    const toTens = () => String(Number.parseInt(unit / 10));
    const toOnes = () => String(unit % 10);
    return toTens() + toOnes();
};

// function for singular time segment
function unitaryCountHandler(){
    if (parseInt(document.querySelector('.webinar__timer--days > .webinar__timer--count').textContent) <= 1) {
        document.querySelectorAll('.webinar__timer--days > .webinar__timer--label').forEach((timer) => {
            timer.textContent = 'Day';
        });
    }
    if (parseInt(document.querySelector('.webinar__timer--hours > .webinar__timer--count').textContent) <= 1) {
        document.querySelectorAll('.webinar__timer--hours > .webinar__timer--label').forEach((timer) => {
            timer.textContent = 'Hr';
        });
    }
    if (parseInt(document.querySelector('.webinar__timer--mins > .webinar__timer--count').textContent) <= 1) {
        document.querySelectorAll('.webinar__timer--mins > .webinar__timer--label').forEach((timer) => {
            timer.textContent = 'Min';
        });
    }
    if (parseInt(document.querySelector('.webinar__timer--secs > .webinar__timer--count').textContent) <= 1) {
        document.querySelectorAll('.webinar__timer--secs > .webinar__timer--label').forEach((timer) => {
            timer.textContent = 'Sec';
        });
    }
};

// function to update the day, hr, min, sec in DOM
function updateTimerUI(day, hrs, min, sec){
    document.querySelectorAll('.webinar__timer--days > .webinar__timer--count').forEach((timer) => {
        timer.textContent = day;
    });
    document.querySelectorAll('.webinar__timer--hours > .webinar__timer--count').forEach((timer) => {
        timer.textContent = hrs;
    });
    document.querySelectorAll('.webinar__timer--mins > .webinar__timer--count').forEach((timer) => {
        timer.textContent = min;
    });
    document.querySelectorAll('.webinar__timer--secs > .webinar__timer--count').forEach((timer) => {
        timer.textContent = sec;
    });

    unitaryCountHandler();
};

// main function to kick off the timer logic
function TimerHandler(){
    // initialize states
    initStates();

    // start timer
    const webinarTimer = setInterval(() => {
        timerState.currentDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        timerState.currentDateSec = Date.parse(timerState.currentDate);

        const distanceCount = timerState.nextDateSec - timerState.currentDateSec;
        // console.log(distanceCount);

        const day = Math.floor(distanceCount / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((distanceCount % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const min = Math.floor((distanceCount % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((distanceCount % (1000 * 60)) / 1000);

        // separating into tens and ones

        const dayCount = unitCount(day);
        const hrCount = unitCount(hrs);
        const minCount = unitCount(min);
        const secCount = unitCount(sec);

        // update UI
        updateTimerUI(dayCount, hrCount, minCount, secCount);

        if (distanceCount <= 0) {
            // move timer to next date if reached 0
            initStates();

            if (timerState.nextDate === '') {
                clearInterval(webinarTimer);
                document.querySelectorAll('.webinar__timer').forEach((timer) => {
                    timer.classList.add('is-hidden');
                });
            }
        }
    }, 1000);
};

$( document ).ready(function() {
   TimerHandler();
});

//  scroll function which displays the timer in the sticky header
// below element selectors will only run for the home page.
const stickyTimerHandler = () => {
    window.onscroll = () => {
            if (scrollY > document.querySelector('#numberRoller').offsetTop - 140) {
                document.querySelector('.webinar__nav-timer').style.display = 'flex';
            } else {
                document.querySelector('.webinar__nav-timer').style.display = 'none';
            }
    };
};
