var KlickartPublicAccordion=function(){var t={},e={toggleActiveClass:function(t){t.hasClass("active")?t.removeClass("active").find(".content").stop().slideUp(300):(t.parent().find(".active").removeClass("active").find(".content").slideUp(300),t.addClass("active").find(".content").stop().slideDown(300))}};return t.init=function(){$(".faq-accordion:not([klickart-edit-faq-question])").on("click",function(){var t=$(this);e.toggleActiveClass(t)})},t}(window);$(document).ready(function(){KlickartPublicAccordion.init()});var KlickartPublicAnalyticsClickCounter=function(){var t={},i={CONVERSION_COUNT_ATTR:"klickart-analytics-count-conversion"};return window.klickart.clickIndetifier=null,i.MAX_REQUESTS_RETRY=5,i.retries=0,i.hasRequestConfig=function(){return window.klickart.analytics&&window.klickart.analytics.deliveryUrl&&window.klickart.analytics.sessionId},i.retryRequest=function(){i.retries>=i.MAX_REQUESTS_RETRY||(setTimeout(i.sendClicks,500),i.retries+=1)},i.clearClick=function(){window.klickart.clickIdentifier=null},i.sendClicks=function(){if(i.hasRequestConfig()){var t=new XMLHttpRequest,e=window.performance.now()/1e3;t.onload=i.clearClick,t.open("POST",window.klickart.analytics.deliveryUrl,!1),t.send(JSON.stringify({clickIdentifier:window.klickart.clickIdentifier,sessionId:window.klickart.analytics.sessionId,timeElapsed:e}))}else i.retryRequest()},i.incrementClick=function(){i.retries=0;var t=this.getAttribute(i.CONVERSION_COUNT_ATTR);window.klickart.clickIdentifier=t,i.sendClicks()},t.init=function(){$("["+i.CONVERSION_COUNT_ATTR+"]").each(function(){$(this).on("click",i.incrementClick)})},t}(window);$(document).ready(function(){KlickartPublicAnalyticsClickCounter.init()});var KlickartPublicAnalyticsSubscription=function(){var t={},n={MAX_REQUESTS_RETRY:5,retries:0,hasRequestConfig:function(){return window.klickart.analytics&&window.klickart.analytics.deliveryUrl&&window.klickart.analytics.sessionId},retryRequest:function(){n.retries>=n.MAX_REQUESTS_RETRY||(setTimeout(n.sendSubscriptionEmail,500),n.retries+=1)},clearSubscription:function(){window.klickart.subscriptionEmail=null},sendSubscriptionEmail:function(){if(n.hasRequestConfig()){var t=new XMLHttpRequest,e=window.performance.now()/1e3;t.onload=n.clearSubscription,t.open("POST",window.klickart.analytics.deliveryUrl,!1),t.send(JSON.stringify({subscriptionEmail:window.klickart.subscriptionEmail||null,sessionId:window.klickart.analytics.sessionId,timeElapsed:e}))}else n.retryRequest()}};return t.init=function(){var t=$("form[klickart-email-subscription-form]"),i=/(email_\d+|email|inf_field_Email|cmp1|kmbSubscribe\[email\]|mauticform\[email\])/gi;t.each(function(){var e=$(this);e.on("submit",function(){n.retries=0;var t=e.find("input").filter(function(){return this.name.match(i)});window.klickart.subscriptionEmail=t.val(),n.sendSubscriptionEmail()})})},t}(window);$(document).ready(function(){KlickartPublicAnalyticsSubscription.init()});var KlickartPublicAutofill=function(){var t={},i={OPTIONS_ATTR:"klickart-form-autofill-options"};return t.init=function(){var t=$("[data-"+i.OPTIONS_ATTR+"]"),e=i.getParameters();t.each(function(){var t=$(this).data(i.OPTIONS_ATTR);t.enabled&&e[t.parameter]&&$(this).val(e[t.parameter])})},i.getParameters=function(){var t=window.location.search.substring(1).split("&"),i={};return $.each(t,function(t,e){e=e.split("="),i[e[0]]=decodeURIComponent(e[1])}),i},t}(window);$(document).ready(function(){KlickartPublicAutofill.init()});var KlickartPublicBanner=function(){var t={},a={PLAYER_ATTR:"klickart-banner-player-button",BANNER_OPTION_ATTR:"klickart-banner-config",IFRAME_CLASS:"klickart-banner-iframe",OPEN_CLASS:"is-open"};return t.init=function(){$("["+a.PLAYER_ATTR+"]").on("click",function(){var t,e=$(this).closest("["+a.BANNER_OPTION_ATTR+"]"),i=e.find("."+a.IFRAME_CLASS);try{t=JSON.parse(e.attr(a.BANNER_OPTION_ATTR))}catch(n){t={}}i.html(t.code),e.addClass(a.OPEN_CLASS),event.preventDefault()})},t}(window);$(document).ready(function(){KlickartPublicBanner.init()});var KlickartPublicContact=function(){var t={},o={};return t.init=function(){$('form[data-type="contact"]').on("submit",function(t){var e,i,n=$(this),a=t.target,r=!1;i=n.find("label.error"),[].forEach.call(i,function(t){"none"!==t.style.display&&(r=!0)}),r||(e=o.buildData(n.serializeObject()),o.send(n.attr("action"),e).done(function(t){var e=a.querySelector("[klickart-edit-contact-redirect]"),i=e?e.value:null;if(!i)return o.showMessage("success",t.message,n),void o.resetForm(a);o.redirect(i)}).fail(function(t){var e=o.parseResponseError(t);o.showMessage("error",e.message,n)}),t.preventDefault())})},o.buildData=function(t){return{to:t.to,from:t.fields.email,subject:"Nova mensagem de "+t.fields.email+' na sua p\xe1gina: "'+$("title").text()+'"',fields:o.buildFields(t.fields)}},o.buildFields=function(t){var i=[];return $.each(t,function(t,e){if("email"===t)return!0;i.push({label:t,value:e})}),i},o.send=function(t,e){return $.ajax({method:"POST",url:t,data:e,dataType:"json"})},o.parseResponseError=function(t){var e={};try{e=$.parseJSON(t.responseText)}catch(i){e.message=""}return e},o.showMessage=function(t,e,i){var n=i.find("[data-form-message]");n.addClass(t).removeClass("hide").text(e),setTimeout(function(){o.resetMessage(n)},4e3)},o.resetForm=function(t){t.reset()},o.resetMessage=function(t){t.addClass("hide").removeClass("success error").text("")},o.redirect=function(t){window.location.href=t},t}();$(document).ready(function(){KlickartPublicContact.init()});var KlickartPublicDelay=function(){var t={},i={OPTIONS_ATTR:"klickart-delay-options",SECONDS:1e3};return t.init=function(){$("[data-"+i.OPTIONS_ATTR+"]").each(function(){var t=$(this),e=t.data(i.OPTIONS_ATTR);if(e.enabled)switch(t.addClass("klickart-hide"),e.selectedType){case"date":i.dateDelay(t,e.dateTime,e.timezone);break;default:i.timeDelay(t,e.time)}})},i.timeDelay=function(t,e){setTimeout(function(){t.removeClass("klickart-hide"),t.addClass("klickart-show")},e*i.SECONDS)},i.dateDelay=function(t,e,i){var n=window.klickart.helpers.date.buildDateWithTimezone(e,i)-DateTimeServer.now().getTime();n<0&&(n=0),setTimeout(function(){t.removeClass("klickart-hide"),t.addClass("klickart-show")},n)},t}(window);$(document).ready(function(){KlickartPublicDelay.init()});var KlickartPublicAutoUpdate=function(){var t={},i={OPTIONS_ATTR:"klickart-auto-update-options",MINUTES:6e4};return t.init=function(){$("[data-"+i.OPTIONS_ATTR+"]").each(function(){var t=$(this).data(i.OPTIONS_ATTR),e=t.time||0;t.enabled&&setInterval(function(){window.FB.XFBML.parse()},e*i.MINUTES)})},t}(window);$(document).ready(function(){KlickartPublicAutoUpdate.init()});var KlickartPublicFakeSubmit=function(){var t={},e={FAKE_SUBMIT_BUTTON:"[klickart-fake-submit-button]"};return t.init=function(){$(e.FAKE_SUBMIT_BUTTON).on("click",function(t){t.preventDefault(),$(t.target).closest("form").submit()})},t}(window);$(document).ready(function(){KlickartPublicFakeSubmit.init()});var KlickartPublicFancybox=function(){var n={},a={POPUP_DATA_CONFIG_ATTR:"klickart-popup-config",POPUP_TYPE_SELECTOR:'body a[klickart-edit-link-type="popup"]',POPUP_TARGET_SELECTOR:'body a[klickart-edit-link-target="popup"]',visibleScroll:!0,controlScroll:function(){a.visibleScroll=!a.visibleScroll,$("body").css({overflow:a.visibleScroll?"":"hidden",height:a.visibleScroll?"":"100%"})}};return a.defaultConfig={padding:0,margin:0,openEffect:"none",closeEffect:"none",scrolling:"no",helpers:{overlay:{locked:!0,css:{background:"rgba(0,0,0,0.6)"}}},afterLoad:function(){setTimeout(function(){$.fancybox.update()},500)},beforeShow:a.controlScroll,afterClose:a.controlScroll},n.bind=function(){var t,i;return 0!==(t=$(a.POPUP_TYPE_SELECTOR+", "+a.POPUP_TARGET_SELECTOR)).length&&(t.each(function(t,e){(i=$(e)).fancybox(n.getConfig(i))}),!0)},n.getConfig=function(t){var e=t.data(a.POPUP_DATA_CONFIG_ATTR);return $.extend({},a.defaultConfig,e)},n}(window);KlickartPublicFancybox.bind();var KlickartFaqLink=function(){var t={},r={FAQ_QUESTION_ATTR:"klickart-edit-faq-question",FAQ_LINK_ATTR:"a[klickart-edit-link-type='faqQuestion']",SMOOTH_FACTOR:650};return t.init=function(){$(r.FAQ_LINK_ATTR).each(function(){var i=$(this),n=i.attr("href");i.on("click",function(t){var e=$("["+r.FAQ_QUESTION_ATTR+"="+n.replace("#","")+"]");e&&(r.scrollToElement(e[0]),i[0].offsetParent.click(),e.click(),t.stopPropagation())})})},r.scrollToElement=function(t){var e,i=$(t).offset().top,n=$(t).height(),a=$(window).height();e=n<a?i-(a/2-n/2):i,$("html, body").animate({scrollTop:e+"px"},r.SMOOTH_FACTOR)},t}(window);$(document).ready(function(){KlickartFaqLink.init()});var KlickartPublicFeed=function(){var t={},i={FEED_ATTR:"[data-klickart-feed]",FEED_TEMPLATE_ATTR:"[data-klickart-feed-template]"};return t.init=function(){var t=$(i.FEED_ATTR);$.each(t,function(t,e){window.klickart.KlickartFeedReader(e).reload().done(function(){e.querySelector(i.FEED_TEMPLATE_ATTR).style.display="none"})})},t}(window);$(document).ready(function(){KlickartPublicFeed.init()});var KlickartPublicFixedMenu=function(){var t={},n={FIXED_CLASS:"fixedmenu",FIXED_BOTTOM_CLASS:"bottom",DEFAULT:"default"};return t.init=function(){$("."+n.FIXED_CLASS).each(function(){var t=$(this);n.cleanMenu(t)})},n.cleanMenu=function(t){if(t.css("top","0px"),t.css("padding-left","0px"),t.hasClass(n.FIXED_BOTTOM_CLASS))return t.css("top",""),void n.setMenuPadding(t,n.FIXED_BOTTOM_CLASS);n.setMenuPadding(t,n.DEFAULT)},n.setMenuPadding=function(t,e){var i=t.outerHeight();i+="px",e!==n.FIXED_BOTTOM_CLASS?$("[klickart-sections]").css("padding-top",i):$("[klickart-sections]").css("padding-block-end",i)},t}(window);$(document).ready(function(){KlickartPublicFixedMenu.init()});var KlickartPublicImportForm=function(){var t={},a={resultElement:'<div class="alert" id="submit_message">Cadastro realizado com sucesso!</div>',styles:{position:"fixed",top:"30px",right:"30px","z-index":"999",display:"none"},errorMessage:"Ocorreu um erro ao tentar realizar o cadastro!"};return t.init=function(){var i,t=$('form[action*="convertkit.com"]'),n=$("body");t.on("submit",function(t){var e=$(this);t.preventDefault(),e.find("button").attr("disabled",!0),$("#submit_message").remove(),i=e.serialize(),i+="&referrer="+encodeURIComponent(window.location.href),$.ajax({type:"POST",url:e.attr("action"),headers:{accept:"application/json"},data:i,success:function(t){n.append($(a.resultElement).css(a.styles).addClass("success")),$("#submit_message").fadeIn(500).delay(2e3).fadeOut(250),e.find("input[type=text]").val(""),e.find("button").attr("disabled",!1),t.redirect_url&&-1<t.redirect_url.indexOf("http")&&(window.location.href=t.redirect_url)}}).fail(function(){n.append($(a.resultElement).css(a.styles).addClass("error").text(a.errorMessage)),$("#submit_message").fadeIn(500).delay(2e3).fadeOut(250),e.find("button").attr("disabled",!1)})})},t}(window);$(document).ready(function(){KlickartPublicImportForm.init()});var KlickartPublicKlickSlider=function(){var t={},r={LIST_ATTR:"klickart-slider-list",CONFIG_ATTR:"klickart-edit-slider-config",DEFAULT_CONFIG:{}};return t.init=function(){var n,a;$("["+r.CONFIG_ATTR+"]").each(function(t,e){var i;n=$(e),a=n.find("["+r.LIST_ATTR+"]"),i=JSON.parse(n.attr(r.CONFIG_ATTR)),$.extend(i,r.DEFAULT_CONFIG),a.klickSlider(i)})},t}(window);$(document).ready(function(){KlickartPublicKlickSlider.init()});var KlickartPublicPhoneNumber=function(){var t={},n={LINK_TYPE:'[klickart-edit-link-type="phoneNumber"]',COUNTRY_CODE:"klickart-edit-link-href-country-code",AREA_CODE:"klickart-edit-link-href-area-code",PHONE_NUMBER:"klickart-edit-link-href-phone-number",LINK_PREFIX:"tel:"};return t.init=function(){var t=$(n.LINK_TYPE);$.each(t,function(t,e){n.buildPhoneNumber(e)})},n.buildLinkPhoneNumber=function(t){var e=$(t),i=e.attr(n.COUNTRY_CODE);areaCode=e.attr(n.AREA_CODE),phoneNumber=e.attr(n.PHONE_NUMBER),e.attr("href",n.LINK_PREFIX+"+"+i+"-"+areaCode+"-"+phoneNumber)},n.buildPlainPhoneNumber=function(t){t.setAttribute("href","#")},n.buildPhoneNumber=function(t){return/Mobi/.test(navigator.userAgent)?n.buildLinkPhoneNumber(t):n.buildPlainPhoneNumber(t)},t}(window);$(document).ready(function(){KlickartPublicPhoneNumber.init()});var KlickartPopup=function(){var t={},a={YOUTUBE_EMBED:/youtube\.com\/embed/};return t.init=function(){$("a[href*='#section-']").each(function(){var e=$(this);if("default"==e.attr("klickart-edit-link-type"))return!1;e.on("click",function(){var t=e.attr("href");$(t).find("iframe").each(function(t,e){var i=$(e);if(a.validYoutubeIframe(i)&&i.attr("data-src")){var n=i.data("src");i.removeAttr("data-src"),i.attr("src",n)}})})})},a.validYoutubeIframe=function(t){return a.YOUTUBE_EMBED.test(t.data("src"))},t}(window);$(document).ready(function(){KlickartPopup.init()}),function(){var t=document.querySelectorAll("[target]");-1<navigator.userAgent.toLowerCase().search("iphone")&&t.forEach(function(t){t.removeAttribute("target")})}();var KlickartPublicSmoothScroll=function(){var t={},e={};return t.init=function(){e.withLink(),e.withSection()},e.withLink=function(){if(window.location.hash&&window.location.hash.match("#section")){var t=$(window.location.hash.match("#section").input);e.calculateLength(t)}},e.withSection=function(){$('a[href*="#section"]:not([href="#"]):not([klickart-edit-link-type="popup"])').on("click",function(){var t=$(this.hash);e.calculateLength(t)})},e.calculateLength=function(t){if(t.length){var e=t.offset().top,i=$(".fixedmenu");return i.length&&(e-=parseInt(i.outerHeight())),$("html, body").animate({scrollTop:e},1e3),!1}},t}();jQuery(document).ready(function(t){KlickartPublicSmoothScroll.init(t)});var KlickartTimer=function(){var t={},s={OPTIONS_ATTR:"klickart-timer-options",DATE_ATTR:"data-datetime",TIMEZONE_ATTR:"data-timezone",PREVIEW_PROD_HOSTNAME:"art.klickpages",PREVIEW_STAG_HOSTNAME:"art.kpages"};return s.LAST_VISITED_DATE_KEY="LastVisitedDate-"+window.location.hostname+window.location.pathname,s.visitorAwayTime=0,t.init=function(){var t=$(".timer");s.startServerTimer(),t.each(function(){var t=$(this);s.checkCurrentTimer(t)})},s.startServerTimer=function(){s.serverNowMilliseconds=DateTimeServer.now().getTime(),setInterval(function(){s.serverNowMilliseconds+=1e3},1e3)},s.checkCurrentTimer=function(t){t.attr("data-"+s.OPTIONS_ATTR)||console.error("Timer without options attribute"),s.handleTimer(t)},s.remainingMilliseconds=function(t){var e=t.getTime()-s.serverNowMilliseconds;return e<=0?0:e},s.getRemainingDays=function(t){return Math.floor(s.remainingMilliseconds(t)/864e5)},s.getRemainingHours=function(t){return Math.floor(s.remainingMilliseconds(t)/36e5)%24},s.getRemainingMinutes=function(t){return Math.floor(s.remainingMilliseconds(t)/6e4)%60},s.getRemainingSeconds=function(t){return Math.floor(s.remainingMilliseconds(t)/1e3)%60},s.kpCountdown=function(t,e){clearInterval(t.kpCountdown),e(),t.kpCountdown=setInterval(e,1e3)},s.handleTimer=function(t){var e,i=t.data(s.OPTIONS_ATTR),n=t.closest("section").parent().attr("id"),a="TimerSeconds-"+n,r="TimerKey-"+n,o=window.klickart.helpers.date.buildDateWithTimezone;e="time"===i.selectedType?s.setFinalDateByTime(i.hours,i.minutes,i.seconds,a,r):o(i.dateTime,i.timezone),s.kpCountdown(t,function(){s.replaceElementContent(t,e),s.shouldRedirectUser(i,e)})},s.visitorAwayTime=function(){var t=localStorage.getItem(s.LAST_VISITED_DATE_KEY);if(!t)return 0;var e=new Date(t);return(((new Date).getTime()-e.getTime())/1e3).toFixed(0)},s.setFinalDateByTime=function(t,e,i,n,a){var r,o=localStorage.getItem(a),c=localStorage.getItem(n);if(o)return new Date(Number.parseInt(o,10));var l=window.klickart.helpers.date.buildDateByTime,u=c?c-s.visitorAwayTime():0;return r=c?l(null,null,u):l(t,e,i),localStorage.setItem(a,r.getTime()),r},s.replaceElementContent=function(t,e){t.find("[data-timer-replace]").each(function(){var t=$(this);switch(t.attr("data-timer-replace")){case"%D":t.html(s.getRemainingDays(e).toString().padStart(2,"0"));break;case"%H":t.html(s.getRemainingHours(e).toString().padStart(2,"0"));break;case"%M":t.html(s.getRemainingMinutes(e).toString().padStart(2,"0"));break;case"%S":t.html(s.getRemainingSeconds(e).toString().padStart(2,"0"))}}),s.remainingMilliseconds(e)<=0&&clearInterval(t.kpCountdown)},s.redirectUser=function(t){""!==t&&window.location.replace(t)},s.isPreviewPage=function(){var t=window.location.hostname;return t.includes(s.PREVIEW_PROD_HOSTNAME)||t.includes(s.PREVIEW_STAG_HOSTNAME)},s.shouldRedirectUser=function(t,e){t.redirect&&window.location.href!==t.url&&(1e3<s.remainingMilliseconds(e)||s.isPreviewPage()||setTimeout(function(){s.redirectUser(t.url)},500))},t}(window);$(document).ready(function(){KlickartTimer.init()});var KlickartPublicWhatsapp=function(){var t={},a={LINK_TYPE:'[klickart-edit-link-type="whatsapp"]',LINK_HREF:"klickart-edit-link-href-whatsapp",LINK_PREFIX:"whatsapp://send?text="};return t.init=function(){var t=$(a.LINK_TYPE);/Mobi/.test(navigator.userAgent)?$.each(t,function(t,e){var i=$(e),n=i.attr(a.LINK_HREF);i.attr("href",a.LINK_PREFIX+n+" - "+window.location.href)}):t.hide()},t}(window);$(document).ready(function(){KlickartPublicWhatsapp.init()});var KlickartYoutubeVideos=function(){var t={},i={},r="https://www.youtube.com/embed/",e=!1,n=document.querySelector("[data-youtubeapikey]");return t.init=function(){if(n&&(n.getAttribute("data-autoupdate")||e)){var t=n.getAttribute("data-numberofvideos");i.updateVideos(t)}},i.updateVideos=function(t){var e={apiKey:n.getAttribute("data-youtubeapikey"),channelName:n.getAttribute("data-channel"),numberOfVideos:t};window.klickart.KlickartYoutubeVideos(e,i.includeListOfVideos)},i.includeListOfVideos=function(a){n.querySelectorAll("iframe").forEach(function(t,e){var i=a.items[e],n=r+(i.id.videoId?i.id.videoId:i.id.playlistId);t.setAttribute("src",n)})},t}(window);$(document).ready(function(){KlickartYoutubeVideos.init()});