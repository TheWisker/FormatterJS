"use strict";function format(e,l,t){function g(e,l){for(;e.length<(l||2);)e="0"+e;return e}return months={long:["January","February","March","April","May","June","July","August","September","October","Noemvber","December"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},days={long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=l.replaceAll(/(%%)/g,"%")).replaceAll(/(%Y)/g,t?e.getUTCFullYear():e.getFullYear())).replaceAll(/(%y)/g,e.getYear())).replaceAll(/(%J)/g,function(){for(var l=t?e.getUTCDate():e.getDate(),g=t?e.getUTCMonth():e.getMonth();g>0;g--)1!=g?g<=6&&g%2==0||g>=7&&g%2==1?l+=31:l+=30:(t?e.getUTCFullYear():e.getFullYear())%4==0?l+=29:l+=28;return l})).replaceAll(/(%M)/g,g((t?e.getUTCMonth():e.getMonth())+1))).replaceAll(/(%m)/g,(t?e.getUTCMonth():e.getMonth())+1)).replaceAll(/(%B)/g,months.long[t?e.getUTCMonth():e.getMonth()])).replaceAll(/(%b)/g,months.short[t?e.getUTCMonth():e.getMonth()])).replaceAll(/(%D)/g,g(t?e.getUTCDate():e.getDate()))).replaceAll(/(%d)/g,t?e.getUTCDate():e.getDate())).replaceAll(/(%A)/g,days.long[t?e.getUTCDay():e.getDay()])).replaceAll(/(%a)/g,days.short[t?e.getUTCDay():e.getDay()])).replaceAll(/(%W)/g,(t?e.getUTCDay():e.getDay())+1)).replaceAll(/(%H)/g,g(t?e.getUTCHours():e.getHours()))).replaceAll(/(%I)/g,g((t?e.getUTCHours():e.getHours())>12?(t?e.getUTCHours():e.getHours())-12:t?e.getUTCHours():e.getHours()))).replaceAll(/(%h)/g,t?e.getUTCHours():e.getHours())).replaceAll(/(%i)/g,(t?e.getUTCHours():e.getHours())>12?(t?e.getUTCHours():e.getHours())-12:t?e.getUTCHours():e.getHours())).replaceAll(/(%K)/g,g(t?e.getUTCMinutes():e.getMinutes()))).replaceAll(/(%k)/g,t?e.getUTCMinutes():e.getMinutes())).replaceAll(/(%S)/g,g(t?e.getUTCSeconds():e.getSeconds()))).replaceAll(/(%s)/g,t?e.getUTCSeconds():e.getSeconds())).replaceAll(/(%L)/g,Math.round(t?e.getUTCMilliseconds():e.getMilliseconds()/100))).replaceAll(/(%Q)/g,g(Math.round(t?e.getUTCMilliseconds():e.getMilliseconds()/10),2))).replaceAll(/(%q)/g,Math.round(t?e.getUTCMilliseconds():e.getMilliseconds())/10)).replaceAll(/(%F)/g,g(t?e.getUTCMilliseconds():e.getMilliseconds(),3))).replaceAll(/(%f)/g,t?e.getUTCMilliseconds():e.getMilliseconds())).replaceAll(/(%P)/g,(t?e.getUTCHours():e.getHours())>12?"PM":"AM")).replaceAll(/(%p)/g,(t?e.getUTCHours():e.getHours())>12?"pm":"am")).replaceAll(/(%T)/g,e.getTimezoneOffset()>=0?"+"+g(Math.floor((e.getTimezoneOffset()+1)/60-1/60)):"-"+g(Math.floor(Math.abs(e.getTimezoneOffset())/60)))).replaceAll(/(%t)/g,e.getTimezoneOffset()>=0?"+"+Math.floor((e.getTimezoneOffset()+1)/60-1/60):"-"+Math.floor(Math.abs(e.getTimezoneOffset())/60))}