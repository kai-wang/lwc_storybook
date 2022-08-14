var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var o=Array(e),i=0,t=0;t<n;t++)for(var a=arguments[t],r=0,u=a.length;r<u;r++,i++)o[i]=a[r];return o};function rangePlugin(t){return void 0===t&&(t={}),function(o){var i,a,r,u="",e={onParseConfig:function(){o.config.mode="range",u=o.config.altInput?o.config.altFormat:o.config.dateFormat},onReady:function(){!function(){if(t.input){if(!(i=t.input instanceof Element?t.input:window.document.querySelector(t.input)))return o.config.errorHandler(new Error("Invalid input element specified"));o.config.wrap&&(i=i.querySelector("[data-input]"))}else(i=o._input.cloneNode()).removeAttribute("id"),i._flatpickr=void 0;var e;!i.value||(e=o.parseDate(i.value))&&o.selectedDates.push(e),i.setAttribute("data-fp-omit",""),o.config.clickOpens&&(o._bind(i,["focus","click"],function(){o.selectedDates[1]&&(o.latestSelectedDateObj=o.selectedDates[1],o._setHoursFromDate(o.selectedDates[1]),o.jumpToDate(o.selectedDates[1])),a=!0,o.isOpen=!1,o.open(void 0,"left"===t.position?o._input:i)}),o._bind(o._input,["focus","click"],function(e){e.preventDefault(),o.isOpen=!1,o.open()})),o.config.allowInput&&o._bind(i,"keydown",function(e){"Enter"===e.key&&(o.setDate([o.selectedDates[0],i.value],!0,u),i.click())}),t.input||o._input.parentNode&&o._input.parentNode.insertBefore(i,o._input.nextSibling)}(),o.config.ignoredFocusElements.push(i),o.config.allowInput?(o._input.removeAttribute("readonly"),i.removeAttribute("readonly")):i.setAttribute("readonly","readonly"),o._bind(o._input,"focus",function(){o.latestSelectedDateObj=o.selectedDates[0],o._setHoursFromDate(o.selectedDates[0]),a=!1,o.jumpToDate(o.selectedDates[0])}),o.config.allowInput&&o._bind(o._input,"keydown",function(e){"Enter"===e.key&&o.setDate([o._input.value,o.selectedDates[1]],!0,u)}),o.setDate(o.selectedDates,!1),e.onValueUpdate(o.selectedDates),o.loadedPlugins.push("range")},onPreCalendarPosition:function(){a&&(o._positionElement=i,setTimeout(function(){o._positionElement=o._input},0))},onChange:function(){o.selectedDates.length||setTimeout(function(){o.selectedDates.length||(i.value="",r=[])},10),a&&setTimeout(function(){i.focus()},0)},onDestroy:function(){t.input||i.parentNode&&i.parentNode.removeChild(i)},onValueUpdate:function(e){var t,n;i&&((r=!r||e.length>=r.length?__spreadArrays(e):r).length>e.length&&(t=e[0],(n=a?[r[0],t]:[t,r[1]])[0].getTime()>n[1].getTime()&&(a?n[0]=n[1]:n[1]=n[0]),o.setDate(n,!1),r=__spreadArrays(n)),n=(t=o.selectedDates.map(function(e){return o.formatDate(e,u)}))[0],o._input.value=void 0===n?"":n,t=t[1],i.value=void 0===t?"":t)}};return e}}export default rangePlugin;