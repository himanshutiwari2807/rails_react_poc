// JavaScript Document

// Define and Initialize variables

var audioFile = "";
var audioDontStart = false;
var videoName = "";
//var ccActive = false;
//var cc_showing = false;
var audioActive = true;
var audioStart = true;

var pageNum = 0;

var backActive = true;
var nextActive = true;
var pageNext = "";
var pageBack = "";
var pages = [];
var pageIndex;
var pageTotal = 0;
var pageData = "";

var backInactiveMsg = "Follow the navigation instructions on the bottom of the screen to proceed.";
var nextInactiveMsg = "Follow the navigation instructions on the bottom of the screen to proceed.";

var rightPanelWidth = "calc(50% - 80px)";

var w, h, l, t = 0;
var headerText, bodyText, popUpImageFile, popUpImageAlt = "";
var fbWin = null;
var timerID = 0;
var popWin = null;
//var pageViewedList = "";
//var pageNameArray = "";

var stopArray = ["LC0001", "LC0005", "LC0020", "LC0160", "LC0190", "LC0210", "LC0240", "LC0320", "LC0350", "LC0540"]; //no Transcript button on these screens

// ------------- PAGE TRACKING -------------
var debug = false;

var pageName = document.location.href;
if (pageName.toLowerCase().indexOf("powertrain") != -1) debug = true;  //uncomment to debug
//if (pageName.toLowerCase().indexOf("s:") != -1) debug = true;  //uncomment to debug
pageName = pageName.substring(pageName.lastIndexOf("/") + 1);  // remove all path info, leaving filename
pageName = pageName.substring(0, pageName.indexOf("."));  // remove extension


//var SCORMuser = new SCORMinst(pageName);

/* ====================================================================================================================== */

function mainResizeWindowElements() {
	try {
		// FEEX
		if (window.innerWidth < 800) {
			var s = window.innerWidth / 800;
			$("#contentBody").css("font-size", s + "em");

			$(".rightPanel").css("margin-left", "5px");
			$(".rightPanel").css("margin-right", "5px");
			$(".rightPanel").css("padding", "0");
			//rightPanelWidth = rightPanelWidth.split(" - 80px)").join(" - 40px)");
			rightPanelWidth = rightPanelWidth.split(" - 80px)").join(" - 10px)");
			$(".rightPanel").css("width", rightPanelWidth);
		}
	} catch (e) {
	}

	try {
		// FEEX
		$("#scrollBlock").css("max-height", ($("#navigationButtons").prop("offsetTop") - $("#scrollBlock").prop("offsetTop") - 60) + "px");
		if (window.innerHeight < 800) {
			var s = window.innerHeight / 800;
			$("#contentBody").css("font-size", s + "em");
			//$("#contentBody").css("padding-left", "60px");
			//$("#contentBody").css("padding-right", "35px");

			$(".rightPanel").css("margin-left", "5px");
			$(".rightPanel").css("margin-right", "5px");
			$(".rightPanel").css("padding", "0");
			//rightPanelWidth = rightPanelWidth.split(" - 80px)").join(" - 40px)");
			rightPanelWidth = rightPanelWidth.split(" - 80px)").join(" - 10px)");
			$(".rightPanel").css("width", rightPanelWidth);

			if ($("#contentBody").prop("scrollHeight") > $("#contentBody").prop("clientHeight")) {
				var d
				for (var p = 100; p >= 5; p = p - 5) {
					$(".rightPanel img").css("max-width", p + "%");
					if ($("#contentBody").prop("scrollHeight") <= $("#contentBody").prop("clientHeight")) break;
					if ($("#scrollBlock").prop("offsetHeight") > $(".rightPanel").prop("offsetHeight")) break;
				}
			}
		}
	} catch (e) {
	}

	try {
		resizeWindowElements();
	} catch (e) {
	}
}


//Menu button handlers
$(function () {
	"use strict";

	//create bottom button bar - Audio, Help, Resources, Exit
	var tmp = "";
	tmp += "<a href='javascript:void(0);' id='btnExitID' class='btnExit' title='Exit'></a>";
	tmp += "<a href='javascript:void(0);' id='btnHelpID' class='btnHelp' title='Help'></a>";
	//tmp += "<a href='javascript:void(0);' id='btnAudioID' class='btnAudio' title='Audio'></a>";
	tmp += "<a href='javascript:void(0);' id='btnCCID' class='btnCC' title='Closed Captions'></a>";
	if ($.inArray(pageName, stopArray) == -1) {
		tmp += "<a href='javascript:void(0);' id='btnTranscriptID' class='btnTranscript' title='Transcript'></a>";
	}
	tmp += "<a href='javascript:void(0);' id='btnResourcesID' class='btnResources' title='Resources'></a>";
	$("#bottomButtons").html(tmp);


	$("#btnExitID").click(function () { //exit button
		if (confirm("Are you sure you want to quit?") === true) {
			//parent.QuitSCO();
			//parent.openerToMenu();
			closePopup();
			try {
				onLeavePage()
			} catch (e) {
			}
			//SCORMuser.savePageData();
			parent.SCORMuser.closeLesson();
			window.parent.close();
			self.close();
			//window.top.parent.location.href = "main.php";
			//window.top.close();
		}
		this.blur();
		return false;
	});
	$("#btnResourcesID").click(function () { //resource button
		w = 820;
		h = 650;
		l = (screen.width - w) / 2;
		if (window.screenX >= screen.width) l += screen.width;
		t = (screen.height - h) / 2 - 30;

		popWin = window.open('Resources.html', 'Resources_window', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t + ',status=no,scrollbars=yes,toolbar=no,menubar=no,location=no');
		popWin.focus();
		//startPopUp3("Resource Button", "This button will bring up a list of lesson resources.");
		//alert("This button will bring up a list of lesson resources.");
		return false;
	});

	$("#btnTranscriptID").click(function () { //transcript button

		var trnscrptLnk = "audio/" + pageName + "_aud.html";
		if ($.inArray(pageName, stopArray) == -1) {
			window.open(trnscrptLnk);
		} else {
			alert("Transcript not available on this page.");
			this.blur();
		}

	});

	$("#btnHelpID").click(function () { //help button
		//$("#audioID").trigger("pause");
		//$("#btnAudioID").addClass("off").attr("title", "Play Audio");
		//sessionStorage.usingScreenReader = 1;
		$("video").trigger("pause");

		w = 800;
		//h = 480;
		h = 670;
		l = (screen.width - w) / 2;
		if (window.screenX >= screen.width) l += screen.width;
		t = (screen.height - h) / 2;
		//fbWin = window.open(fname + ".html", "Popup", "width=640,height=360,left=" + l + ",top=" + t + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
		fbWin = window.open('Help.html', 'Help_window', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t + ',status=no,scrollbars=yes,toolbar=no,menubar=no,location=no');
		//fbWin.focus();
		//displayVidPopup("U1S0005");
		//alert("Help screens will be added to the course for the beta version.");
		this.blur();
	});

	//alert($("#audioID").prop("id"));
	/*if ($("#audioMain").length) {
	 if (sessionStorage.usingScreenReader == 1) $("#btnAudioID").addClass("off").attr("title", "Play Audio");
	 $("#btnAudioID").click(function () {
	 if ($("#audioMain").prop("paused")) {
	 $("#audioMain").trigger("play");
	 $("#btnAudioID").removeClass("off").attr("title", "Pause Audio");
	 sessionStorage.usingScreenReader = 0;
	 } else {
	 $("#audioMain").trigger("pause");
	 $("#btnAudioID").addClass("off").attr("title", "Play Audio");
	 sessionStorage.usingScreenReader = 1;
	 }
	 });
	 } else {
	 if (sessionStorage.usingScreenReader == 1) {
	 $("#btnAudioID").addClass("off").attr("title", "Play Audio");
	 }
	 $("#btnAudioID").attr("title", "No Audio On This Screen").fadeTo("fast", 0.4);
	 }*/
	$("#btnCCID").click(function () {
		//var isPaused = $("#videoID").prop("paused");
		//var curTime = $("#videoID").prop("currentTime");
		//if (!isPaused) $("#videoID").trigger("pause");
		var msg = "";
		if (sessionStorage.showCC == 1) {
			msg = "The videos in this course are currently set to automatically show the closed captions.\n\n";
			//var msg += "Would you like to set the videos to default to NOT showing the closed captions?";
			msg += "Would you like to set the video default to NOT show closed captions?";
		} else {
			msg = "The videos in this course are currently set to NOT automatically show the closed captions.\n\n";
			msg += "Would you like to set the video default to ALWAYS show closed captions?";
		}
		if (confirm(msg)) {
			toggleCC();
		}
		//{
		//	$("#videoID").prop("currentTime", curTime);
		//}
		this.blur();
		//if (!isPaused) $("#videoID").trigger("play");
	});

	$("a.btnBack").click(function () { //back button
		if (backActive) {
			closePopup();
			try {
				onLeavePage()
			} catch (e) {
			}
			//SCORMuser.savePageData();
			document.location.href = pageBack;
		} else {
			alert(backInactiveMsg);
		}
	});
	$("#btnNextID").click(function () { //next button
		if (nextActive) {
			closePopup();
			try {
				onLeavePage()
			} catch (e) {
			}
			//SCORMuser.savePageData();
			if (pageNext.indexOf("*EXIT*") < 0) {
				if (pageNext.indexOf(".html") < 0) pageNext += ".html";
				document.location.href = pageNext;
			} else {
				SetCompleteFromChild();
				parent.QuitSCO();
				window.opener = self;
				window.top.close();
			}
		} else {
			alert(nextInactiveMsg);
		}
	});
	$("a.btnNextEnd").click(function () { //next button
		if (confirm("Are you sure you want to quit?") === true) {
			closePopup();
			try {
				onLeavePage()
			} catch (e) {
			}
			//SCORMuser.savePageData();
			parent.QuitSCO();
			window.opener = self;
			window.top.close();
		}
		return false;
	});

	$(window).resize(function () {
		mainResizeWindowElements();
	});

	pages = ["LC0001", "LC0005", "LC0020", "LC0030", "LC0040", "LC0050", "LC0060", "LC0070", "LC0080", "LC0090", "LC0100", "LC0110", "LC0120", "LC0130", "LC0140", "LC0150", "LC0160", "LC0170", "LC0180", "LC0190", "LC0200", "LC0210", "LC0220", "LC0230", "LC0240", "LC0250", "LC0260", "LC0270", "LC0280", "LC0290", "LC0300", "LC0310", "LC0320", "LC0330", "LC0340", "LC0350", "LC0360", "LC0370", "LC0380", "LC0390", "LC0400", "LC0410", "LC0420", "LC0430", "LC0440", "LC0450", "LC0460", "LC0470", "LC0480", "LC0490", "LC0500", "LC0510", "LC0520", "LC0530", "LC0540"];
	pageTotal = pages.length;
	for (var i = 0; i < pages.length; i++) {
		if (pages[i] == pageName) {
			pageIndex = i;
			pageNum = pageIndex + 1;
			break;
		}
	}
	//$("#divProgress").text("Unit " + sessionStorage.unitNumber + ": Page " + pageNum + " of " + pageTotal);
	//$("#divProgress").text("Page " + pageNum + " of " + pageTotal);
	//$("#divProgress").text("Page X of Y");
});

/* ====================================================================================================================== */

function enterPage() {
	"use strict";

	//$("#courseHeader").text("Leading Change");
	parent.SCORMuser.recordBookmark(pageName);
	//alert(pageName);
	if (pageName == "LC0001") {
		$("#courseHeader").html("<img src=\"images/LC_Title.png\" alt=\"Leading Change\" title=\"Leading Change\">");
	} else {
		$("#courseHeader").html("<img src=\"images/LeadingChangeLogo_noWaves.png\" width=\"270px\" height=\"30px\" alt=\"Leading Change\" title=\"Leading Change\">");
	}
	if (debug) {
		var tmp = "";
		//tmp += "Page ID =&nbsp;";
		tmp += "<a href='javascript:debugShowWindowParams()' class='debugSWP'>Page ID</a> =&nbsp;";
		tmp += "<select id='debugJumpToPage' onchange='jumpToPage(this.options[this.selectedIndex].text)'>";
		tmp += "<option value=''>* Jump To Page *</option>";
		for (var i = 0; i < pages.length; i++)
			if (i == pageIndex) {
				tmp += "<option selected='selected'>" + pages[i] + "</option>";
			} else {
				tmp += "<option>" + pages[i] + "</option>";
			}
		tmp += "</select>";

		//if (pageName.indexOf("_KC") >= 0) {
		//	tmp += "<div id='debugAnswer'>Answer = " + correctResponse + "</div>";
		//}

		$("#ContentReviewDiv").html(tmp).show();
	}

	pageNext += ".html";
	pageBack += ".html";

	if (!backActive) {
		$("#btnBackID").attr({"class": "btnBackDim", "title": "Back (inactive)"});
	}

	if (!nextActive) {
		//this if block was commented out
		if (parent.SCORMuser) {
			if (!parent.SCORMuser.findItem(pageName)) {
				//alert("item not found");
				$("#btnNextID").attr({"class": "btnNextDim", "title": "Next (inactive)"});
			} else {
				//alert("item found");
				nextActive = true;
			}
		}
		// to here
		/*if (!parent.SCORMuser) {
		 alert("not SCORMuser");
		 } else if (pageData == "1") {
		 nextActive = true;
		 } else {
		 $("#btnNextID").attr({"class": "btnNextDim", "title": "Next (inactive)"});
		 }*/
	} else {
		parent.SCORMuser.addThisPage();
	}

	//if (debug) {
	//	document.getElementById("debug").innerHTML = 'S0<input type="text" maxlength="3" size="5" id="goPage" value="' + pageName.slice(2) + '" /><input type="button" value="To Page" title="To Page" onMouseUp="jumpToPage();" />';
	//}

	$("img").each(function () {
		$(this).attr({"title": this.alt});
	});

	//$("video").bind("click", function () {this.play();});

	if (pageNum == pageTotal) SetCompleteFromChild();

	try {
		enterPageLocal()
	} catch (e) {
	}

	mainResizeWindowElements();
}

function debugShowWindowParams() {
	var FEEX = "";
	//FEEX += "window.screenX = " + window.screenX + "\n";
	FEEX += "window.innerWidth = " + window.innerWidth + "\n";
	FEEX += "window.innerHeight = " + window.innerHeight + "\n";
	FEEX += "\n";
	FEEX += "window.outerWidth = " + window.outerWidth + "\n";
	FEEX += "window.outerHeight = " + window.outerHeight + "\n";
	FEEX += "\n";
	FEEX += "screen.availWidth = " + screen.availWidth + "\n";
	FEEX += "screen.availHeight = " + screen.availHeight + "\n";
	FEEX += "\n";
	//FEEX += "screen.width = " + screen.width + "\n";
	FEEX += "screen.height = " + screen.height + "\n";
	alert(FEEX);
	window.resizeTo(903, 751);
}

//function resizeWindowElements() {
//	try { 
//		var ch = $("#contentBody").css("height").split("px")[0];
//		var ph = $("#scrollBlock").css("height").split("px")[0];
//		if (ch - ph < 110) {
//			$("#scrollBlock").css("height", (ch - 110) + "px");
//		}
//	} catch (e) {}
//	
//	try { resizeWindowElementsLocal() } catch (e) {}
//}

function activateNext() {
	"use strict";
	var tagline = (arguments[0]) ? arguments[0] : "Select Next to continue.";
	$("#btnNextID").removeClass("btnNextDim").addClass("btnNext").attr("title", "Next");
	$("#nex2").removeClass("btnNextDim").addClass("btnNext").attr("title", "Next");
	$("#prompt_text").text(tagline);
	nextActive = true;
	parent.SCORMuser.addThisPage();
}

function popupLoaded() {
	"use strict";
	$("#popupFrame").css({"height": $(document).height() + 100, "background-color:": "green"});
}

function startPopUp3(hdr, txt, wi, he, imgFile, imgAlt) {
	"use strict";
	// Optional Arguments
	w = (arguments[2]) ? arguments[2] : 500;
	h = (arguments[3]) ? arguments[3] : 350;
	popUpImageFile = (arguments[4]) ? arguments[4] : "";
	popUpImageAlt = (arguments[5]) ? arguments[5] : "";

	headerText = hdr;
	bodyText = txt;
	//popUpImageFile = imgFile;
	//popUpImageAlt = imgAlt;

	if (fbWin) {
		//alert("3 fbWin:"+fbWin+ " !fbWin.closed:"+!fbWin.closed );
		fbWin.close();
		fbWin = null;
		timerID = setTimeout(displayPopUp, 150);
	} else {
		displayPopUp();
	}
}

function displayPopUp() {
	"use strict";
	clearTimeout(timerID);
	timerID = 0;

	//w = 500;
	//h = 400;

	l = (screen.width - w) / 2;
	if (window.screenX >= screen.width) l += screen.width;

	t = (screen.height - h) / 2 - 30;

	fbWin = window.open("", "Popup", "width=" + w + ",height=" + h + ",left=" + l + ",top=" + t + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");

	if (fbWin !== null) {
		if (fbWin.opener === null) {
			fbWin.opener = window;
		}

		var popupContent, popupContentHead = "";
		var popupTitle = (headerText == "") ? "Popup Text" : headerText;
		popupContentHead += "<!DOCTYPE html>\n<html lang=\"en-US\" style=\"height:" + (h - 2) + "px; padding:0; margin:0; border: 3px solid #0D2A70; background-color:#FFF; display:block; \">\n";
		popupContentHead += "<head>\n";
		popupContentHead += "<meta charset=\"utf-8\">\n";
		//popupContentHead += "<title>Popup Text &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<\/title>\n";
		popupContentHead += "<title>" + popupTitle + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<\/title>\n";
		popupContentHead += "<link href=\"css/styles.css\" rel=\"stylesheet\" type=\"text/css\" />\n<script type=\"text/javascript\" src=\"../javascript/jquery-1.11.3.min.js\"></script>";
		popupContentHead += "<script type=\"text/javascript\" src=\"../javascript/main.js\"><\/script>\n";
		//popupContentHead += "<script type=\"text/javascript\">$(document).ready(function () {popupLoaded();});<\/script>\n";
		popupContentHead += "<\/head>\n";
		popupContent = popupContentHead;
		popupContent += "<body style=\"background-color:#FFFFFF; background-image:none; margin:0; padding:0; height:100%\">\n";
		popupContent += "<div id=\"popupFrame\" style=\"height:" + (h - 23) + "px; border: 3px solid #56A4D6; margin:6px; padding:0;\">";
		popupContent += "<div id=\"popupTitle\">" + headerText + "<\/div>\n";
		popupContent += "<div style=\"overflow-y:auto; height:" + (h - 120) + "px;\">\n";
		if (popUpImageFile !== "") {
			popupContent += "<img src='imagesLsn/" + popUpImageFile + "' style='margin-left:20px; float:right; border-style:none;' alt=\"" + popUpImageAlt + "\" title=\"" + popUpImageAlt + "\">\n";
		}
		popupContent += "<div id=\"popupText\">" + bodyText + "<\/div>\n<\/div>\n";
		popupContent += "<div align=\"center\"><button type=\"button\" onclick=\"window.close(); return false;\">Close this window<\/button><\/div>\n<\/div>\n";
		popupContent += "<\/body>\n<\/html>";

		fbWin.document.write(popupContent);
		fbWin.focus();
	}
}
function closePopup() {
	if (fbWin) {
		fbWin.close();
		fbWin = null;
	}
}
function printWindow(txt) {
	w = 800;
	h = 600;

	l = (screen.width - w) / 2;
	if (window.screenX >= screen.width) l += screen.width;
	t = (screen.height - h) / 2 - 30;

	bodyText = txt;

	fbWin = window.open("PrintWindowPopup.html", "Popup", "width=" + w + ",height=" + h + ",left=" + l + ",top=" + t + ",toolbar=no,location=no,directories=no,status=no,menubar=no");
}

function displayVidPopup(nam) {
	//var $window = $(window);
	videoName = nam;

	$("audio").trigger("pause");
	$("video").trigger("pause");

	w = 720;
	h = 480;
	l = (screen.width - w) / 2;
	if (window.screenX >= screen.width) l += screen.width;
	t = (screen.height - h) / 2;
	//fbWin = window.open(fname + ".html", "Popup", "width=640,height=360,left=" + l + ",top=" + t + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
	fbWin = window.open("VideoPopup.html", "Popup", "width=" + w + ",height=" + h + ",left=" + l + ",top=" + t + ",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
	fbWin.focus();
}

function jumpToPage(pageID) {
	pageID += ".html";

	closePopup();
	try {
		onLeavePage()
	} catch (e) {
	}
	//SCORMuser.savePageData();
	document.location.href = pageID;
}

function playAudio(audName) {
	"use strict";

	var a = "";
	if (sessionStorage.usingScreenReader == 0) {
		a += "<audio id='audioID' autoplay>";
	} else {
		a += "<audio id='audioID' paused='true'>";
	}
	a += "<source src='audio/" + audName + ".mp3' type='audio/mp3'>";
	a += "Your browser does not support the audio tag.";
	a += "</audio>";

	document.write(a);
}

function showVideo(nam) {
	"use strict";
	videoName = nam;
	var v = "";
	v += "<div id='videoDiv' align='center'>";
	//v += "<video id='videoID' controls>";
	v += "<video id='videoID' controls preload='auto'>";
	v += "<source src='video/" + videoName + ".mp4' type='video/mp4'>";
	v += "<track id='CCtrack' src='video/CC_" + videoName + ".vtt' kind='captions' srclang='en' label='Captions'";
	v += (sessionStorage.showCC == 1) ? " default>" : ">";

	v += "Your browser does not support the video tag.";
	v += "</video>";
	v += "</div>";

	//FEEX - the following blocks video from playing at all in Firefox
	//v += "<script type='text/javascript'>$('video').bind('click', function () {this.play();});</script>";

	//v += "<div align='center'><a href='javascript:void(0);' id='btnTranscriptID' class='btnTranscript'></a></div>";

	document.write(v);
}

function showVideoFeedback(nam) {
	"use strict";
	videoName = nam;
	var v = "";
	//v += "<div id='videoDiv' align='center'>";
	v += "<video id='videoID' controls preload='auto' autoplay>";
	v += "<source src='video/" + videoName + ".mp4' type='video/mp4'>";
	v += "<track id='CCtrack' src='video/CC_" + videoName + ".vtt' kind='captions' srclang='en' label='Captions'";
	v += (sessionStorage.showCC == 1) ? " default>" : ">";

	v += "Your browser does not support the video tag.";
	v += "</video>";
	//v += "</div>";

	$("#videoDiv").html(v);
	$("video").bind("ended", function () {
		jumpToPage(pageNext.split(".")[0]);
	});
}

function toggleCC() {
	//FEEX - need to re-bind $("video").bind("ended", function ()... etc.
	//alert(sessionStorage.showCC + "-a");
	if (sessionStorage.showCC == 0) {
		sessionStorage.showCC = 1;
	} else {
		sessionStorage.showCC = 0;
	}
	//alert(sessionStorage.showCC + "-a");
	//sessionStorage.showCC = 1 - sessionStorage.showCC;
	if (videoName != "") {
		jumpToPage(pageName);

		/*
		 var v = "";
		 //v += "<video id='videoID' controls>";
		 v += "<source src='video/" + videoName + ".mp4' type='video/mp4'>";
		 v += "<track id='CCtrack' src='video/CC_" + videoName + ".vtt' kind='captions' srclang='en' label='Captions'";
		 v += (sessionStorage.showCC == 1) ? " default>" : ">";

		 v += "Your browser does not support the video tag.";
		 //v += "</video>";
		 //$("#videoDiv").html(v);
		 $("#videoID").html(v);
		 //$("#videoID").load();
		 $("#videoID").trigger("load");
		 */
	}
}

function deactivateLinks(r) {
	for (var l = 1; l <= 3; ++l) {
		$("#link" + l).prop("href", "JavaScript:void(0);");
		$("#link" + l).css("cursor", "default");
		$("#link" + l).css("text-decoration", "none");
		var c = (l == r) ? "#000000" : "#666666";
		$("#link" + l).css("color", c);
		/*
		 $("#link"+l).hover(function(){this.style.color=c},function(){this.style.color=c});
		 */
	}
}

// ********************************************* SCORM Functions *********************************************

/**************************************************************************************************************
 Child window can call this function to set this lesson complete.  This should be an automatic call on the last
 page of a SCO
 **************************************************************************************************************/
function SetCompleteFromChild() {
	"use strict";
	if (parent.lmsconnection) {
		doLMSSetValue("cmi.core.score.raw", "100");
		doLMSSetValue("cmi.core.lesson_status", "completed");
		doLMSCommit();
	}
}

/**************************************************************************************************************
 Child window can call this function to terminate the connection to the LMS and close the intermediate window.
 This call should be invoked from the child on the quit button.
 **************************************************************************************************************/
function QuitSCO() {
	"use strict";
	doLMSFinish();
	parent.lmsconnection = false;
}

/**************************************************************************************************************
 This function sets the current page as a bookmark to the LMS
 **************************************************************************************************************/
function SetBookmark(pageURL) {
	"use strict";
	var b;
	var lc;
	var ok;
	b = pageURL;
	lc = b.toLowerCase();
	//ok = lc.indexOf("ref") + lc.indexOf("menu") + lc.indexOf("resources");
	if (ok == -3) {

		//alert("currentBookmark: " + currentBookmark);
		if (parent.lmsconnection) {
			doLMSSetValue("cmi.core.lesson_location", pageURL);
			doLMSCommit();
		}
	}
}

/**************************************************************************************************************
 This function sets the current completion string to the LMS
 **************************************************************************************************************/
function SaveSuspendData() {
	"use strict";
	if (parent.lmsconnection) {
		doLMSSetValue("cmi.suspend_data", sessionStorage.suspend_data);
		doLMSCommit();
	}
}

/* ***************************************************************************************************************
 Special audio functions.  Uses the Web Audio API and webaudiox.js library.
 This is needed because the iPad will not accept triggered audio with the regular audio API
 ************************************************************************************************************** */
function playTagAudio(tagName) {

}