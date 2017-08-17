
var TimerCount = 0;
var TimerStart  = null;
var TimeToRun = null;
var Blinker = 1;

function showtimer() 
   {
   // Take the values from the form for the user's 
   // desired time and convert that to seconds.
	
  // var hours = document.timeform.hours.value;
   var minutes = document.timeform.minutes.value;
   var TimeToRun = /*(hours * 60 * 60)*/ + (minutes *60);
   //var WarnAt = (document.timeform.warn.value * 60);
   
   if (TimerCount) 
      {
      clearTimeout(TimerCount);
      }
   
   // If TimerStart isn't set, then set it
   // to the current time as a date object.
   if (!TimerStart)
      {
      TimerStart = new Date();
      }
      
   var timeend = new Date();
   var TimeDifference = timeend.getTime() - TimerStart.getTime();
   
   // set a timeout to conserve cpu, we only need one instance per second
   TimerCount = setTimeout("showtimer()", 1000);

   // If the time left is a positive value, we 
   // just display the decrementing time
   if (Math.round(TimeToRun - (TimeDifference/1000)) > 0)
      {
      document.timeform.timeleft.value 
         = time(1000 * (TimeToRun - (TimeDifference/1000)));
      // Once we reach the warning interval, display a yellow circle
      if (Math.round(TimeToRun - (TimeDifference/1000)) < WarnAt + 1)
         {
    	 
         //document.getElementById('blinker').className='yellow_circle';
         }
      }
   else 
      {
      // At this point we're negative, so start blinking red.
      document.timeform.timeleft.value 
         = time(-1000 * (TimeToRun - (TimeDifference/1000) -1 ));
      if (Blinker == 1)
         {
    	  //document.getElementById('blinker').className='red_circle';
         Blinker = 0;
         }
      else 
         {
    	  // document.getElementById('blinker').className='no_circle';
         Blinker = 1;
         }
      }
   } // end of showtimer()

function sw_start()
   {
	// document.getElementById('blinker').className='green_circle';
   if(!TimerCount)
      {
      //TimerStart   = new Date();
      //document.timeform.timetextarea.value = "00:00";
      //document.timeform.laptime.value = "";
      TimerCount  = setTimeout("showtimer()", 1000);
      }
   else
      {
      var TimeDifference = timeend.getTime() + TimerStart.getTime();
      }
   }

function Stop() 
   {
   if(TimerCount) 
      {
      clearTimeout(TimerCount);
      TimerCount  = 0;
      }
   TimerStart = null;
   }

function Reset() 
   {
   if(TimerCount) 
      {
      clearTimeout(TimerCount);
      TimerCount  = 0;
      }
   TimerStart = null;
   //document.timeform.hours.value = "";
   document.timeform.minutes.value = "";
   document.timeform.timeleft.value="";
  // document.timeform.warn.value="";
   document.timeform.timeleft.value="00:00:00";
   //document.getElementById('blinker').className='green_circle';
   }

// this part from:
// http://bytes.com/topic/javascript/answers/92815-converting-milliseconds-days-hours-minutes-seconds

function two(x) 
   {
   return ((x>9)?"":"0")+x;
   }

function three(x) 
   {
   return ((x>99)?"":"0")+((x>9)?"":"0")+x;
   }

function time(ms) 
   {
   var sec = Math.floor(ms/1000);
   ms = ms % 1000;
   // uncomment for milliseconds
   //t = three(ms);

  var min = Math.floor(sec/60);
  sec = sec % 60;
  // uncomment for milliseconds
  //t = two(sec) + ":" + t;
  t = two(sec);

  var hr = Math.floor(min/60);
  min = min % 60;
  t = two(min) + ":" + t;

  var day = Math.floor(hr/60);
  hr = hr % 60;
  t = two(hr) + ":" + t;
  // uncomment for milliseconds
  //t = day + ":" + t;

  return t;
  }

