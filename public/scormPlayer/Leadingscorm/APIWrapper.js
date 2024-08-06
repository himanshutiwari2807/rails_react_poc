/*******************************************************************************
**
** FileName: APIWrapper.js
**
*******************************************************************************/
/*******************************************************************************
**
** Modified with permission by Skillsoft Corporation.
**
** Code based on APIWrapper.js by Concurrent Technologies Corporation (CTC)
**
*******************************************************************************/
/*******************************************************************************
**
** Concurrent Technologies Corporation (CTC) grants you ("Licensee") a non-
** exclusive, royalty free, license to use, modify and redistribute this
** software in source and binary code form, provided that i) this copyright
** notice and license appear on all copies of the software; and ii) Licensee does
** not utilize the software in a manner which is disparaging to CTC.
**
** This software is provided "AS IS," without a warranty of any kind. ALL
** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-
** INFRINGEMENT, ARE HEREBY EXCLUDED. CTC AND ITS LICENSORS SHALL NOT BE LIABLE
** FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
** DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES. IN NO EVENT WILL CTC OR ITS
** LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT,
** INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER
** CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF THE USE OF
WBT Creation Guide for LMS 5.x 39
** OR INABILITY TO USE SOFTWARE, EVEN IF CTC HAS BEEN ADVISED OF THE POSSIBILITY
** OF SUCH DAMAGES.
**
*******************************************************************************/
/*******************************************************************************
** This file is part of the ADL Sample API Implementation intended to provide
** an elementary example of the concepts presented in the ADL Sharable
** Content Object Reference Model (SCORM).
**
** The purpose in wrapping the calls to the API is to (1) provide a
** consistent means of finding the LMS API implementation within the window
** hierarchy and (2) to validate that the data being exchanged via the
** API conforms to the defined CMI data types.
**
** This is just one possible example for implementing the API guidelines for
** runtime communication between an LMS and executable content components.
** There are several other possible implementations.
**
** Usage: Executable course content can call the API Wrapper
** functions as follows:
**
** javascript:
** var result = doLMSInitialize();
** if (result != true)
** {
** // handle error
** }
**
** authorware
** result := ReadURL("javascript:doLMSInitialize()", 100)
**
*******************************************************************************/
var _Debug = false;  // set this to false to turn debugging off
                     // and get rid of those annoying alert boxes.

// Define exception/error codes
var _NoError = 0;
var _GeneralException = 101;
var _ServerBusy = 102;
var _InvalidArgumentError = 201;
var _ElementCannotHaveChildren = 202;
var _ElementIsNotAnArray = 203;
var _NotInitialized = 301;
var _NotImplementedError = 401;
var _InvalidSetValue = 402;
var _ElementIsReadOnly = 403;
var _ElementIsWriteOnly = 404;
var _IncorrectDataType = 405;

// local variable definitions
var apiHandle = null;
var api = null;

// player needs scorm version, either "1.2" or "2004"
var scormVersion = "1.2";

/*******************************************************************************
**
** Function: doLMSInitialize()
** Inputs: None
** Return: CMIBoolean true if the initialization was successful, or
** CMIBoolean false if the initialization failed.
**
** Description:
** Initialize communication with LMS by calling the LMSInitialize
** function which will be implemented by the LMS.
**
*******************************************************************************/
function doLMSInitialize()
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSInitialize was not successful.");
      return "false";
   }

   var result = api.LMSInitialize("");

   if (result.toString() != "true")
   {
      var err = ErrorHandler();
   }

   return result.toString();
}

/*******************************************************************************
**
** Function doLMSFinish()
** Inputs: None
** Return: CMIBoolean true if successful
** CMIBoolean false if failed.
**
** Description:
** Close communication with LMS by calling the LMSFinish
** function which will be implemented by the LMS
**
*******************************************************************************/
function doLMSFinish()
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSFinish was not successful.");
      return "false";
   }
   else
   {
      // call the LMSFinish function that should be implemented by the API

      var result = api.LMSFinish("");
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
      }

   }
   return result.toString();
}

/*******************************************************************************
**
** Function doLMSGetValue(name)
** Inputs: name - string representing the cmi data model defined category or
** element (e.g. cmi.core.student_id)
** Return: The value presently assigned by the LMS to the cmi data model
** element defined by the element or category identified by the name
** input value.
**
** Description:
** Wraps the call to the LMS LMSGetValue method
**
*******************************************************************************/
function doLMSGetValue(name)
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSGetValue was not successful.");
      return "";
   }
   else
   {
      var value = api.LMSGetValue(name);
      return value.toString();
   }
}

/*******************************************************************************
**
** Function doLMSSetValue(name, value)
** Inputs: name -string representing the data model defined category or element
** value -the value that the named element or category will be assigned
** Return: CMIBoolean true if successful
** CMIBoolean false if failed.
**
** Description:
** Wraps the call to the LMS LMSSetValue function
**
*******************************************************************************/
function doLMSSetValue(name, value)
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSSetValue was not successful.");
      return;
   }
   else
   {
      var result = api.LMSSetValue(name, value);
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
      }
   }
   return result.toString();
}

/*******************************************************************************
**
** Function doLMSCommit()
** Inputs: None
** Return: None
**
** Description:
** Call the LMSCommit function
**
*******************************************************************************/
function doLMSCommit()
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSCommit was not successful.");
      return "false";
   }
   else
   {
      var result = api.LMSCommit("");
      if (result != "true")
      {
         var err = ErrorHandler();
      }
   }
   return result.toString();
}

/*******************************************************************************
**
** Function doLMSGetLastError()
** Inputs: None
** Return: The error code that was set by the last LMS function call
**
** Description:
** Call the LMSGetLastError function
**
*******************************************************************************/
function doLMSGetLastError()
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSGetLastError was not successful.");
      //since we can't get the error code from the LMS, return a general error
      return _GeneralException;
   }
   return api.LMSGetLastError().toString();
}

/*******************************************************************************
**
** Function doLMSGetErrorString(errorCode)
** Inputs: errorCode - Error Code
** Return: The textual description that corresponds to the input error code
**
** Description:
** Call the LMSGetErrorString function
**
********************************************************************************/
function doLMSGetErrorString(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSGetErrorString was not successful.");
   }
   return api.LMSGetErrorString(errorCode).toString();
}

/*******************************************************************************
**
** Function doLMSGetDiagnostic(errorCode)
** Inputs: errorCode - Error Code(integer format), or null
** Return: The vendor specific textual description that corresponds to the
** input error code
**
** Description:
** Call the LMSGetDiagnostic function
**
*******************************************************************************/
function doLMSGetDiagnostic(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSGetDiagnostic was not successful.");
   }
   return api.LMSGetDiagnostic(errorCode).toString();
}

/*******************************************************************************
**
** Function LMSIsInitialized()
** Inputs: none
** Return: true if the LMS API is currently initialized, otherwise false
**
** Description:
** Determines if the LMS API is currently initialized or not.
**
*******************************************************************************/
function LMSIsInitialized()
{
   // there is no direct method for determining if the LMS API is initialized
   // for example an LMSIsInitialized function defined on the API so we'll try
   // a simple LMSGetValue and trap for the LMS Not Initialized Error
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
      return false;
   }
   else
   {
      var value = api.LMSGetValue("cmi.core.student_name");
      var errCode = api.LMSGetLastError().toString();
      if (errCode == _NotInitialized)
      {
         return false;
      }
      else
      {
         return true;
      }
   }
}

/*******************************************************************************
**
** Function ErrorHandler()
** Inputs: None
** Return: The current value of the LMS Error Code
**
** Description:
** Determines if an error was encountered by the previous API call
** and if so, displays a message to the user. If the error code
** has associated text it is also displayed.
**
*******************************************************************************/
function ErrorHandler()
{
   var api = getAPIHandle();
   if (api == null)
   {
      if (_Debug)
         alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
      return;
   }

   // check for errors caused by or from the LMS
   var errCode = api.LMSGetLastError().toString();
   if (errCode != _NoError)
   {
      // an error was encountered so display the error description
      var errDescription = api.LMSGetErrorString(errCode);
      if (_Debug)
      {
         errDescription += "\n";
         errDescription += api.LMSGetDiagnostic(null);
         // by passing null to LMSGetDiagnostic, we get any available diagnostics
         // on the previous error.
         alert(errDescription);
      }
   }
   return errCode;
}

/******************************************************************************
**
** Function getAPIHandle()
** Inputs: None
** Return: value contained by APIHandle
**
** Description:
** Returns the handle to API object if it was previously set,
** otherwise it returns null
**
*******************************************************************************/
function getAPIHandle()
{
   if (apiHandle == null)
   {
      apiHandle = getAPI();
   }
   return apiHandle;
}

/*******************************************************************************
**
** Function findAPI(win)
** Inputs: win - a Window Object
** Return: If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API in parent and opener windows
**
*******************************************************************************/
function findAPI(win)
{
   // Search the window hierarchy for an object named "API"
   // Look in the current window (win) and recursively look in any child frames
   if (_Debug)
   {
      //alert("Window location is:\n" + win.location.href);
   }
   if (win.API != null)
   {
      if (_Debug)
      {
         alert("Found API in this window.");
      }
      return win.API;
   }

   if (win.length > 0) 
   {
      if (_Debug)
      {
            alert("Looking for API in window's frames.");
      }
      for (var i=0;i<win.length;i++)
      {
         if (_Debug)
         {
            alert("Looking for API in frames["+i+"]");
         }
         var theAPI = findAPI(win.frames[i]);
         if (theAPI != null)
         {
            return theAPI;
         }
      }
   }
   if (_Debug)
   {
      alert("Didn't find API in this window (or its children).");
   }
   return null;
}

/*******************************************************************************
**
** Function getAPI()
** Inputs: none
** Return: If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API, first in the current window's
** frame hierarchy and then, if necessary, in the current window's opener window
** hierarchy (if there is an opener window).
**
*******************************************************************************/
function getAPI()
{
   if (_Debug) {
      alert("in getAPI()");
   }

   // start at the topmost window - findAPI will recurse down through
   // all of the child frames
   var theAPI = findAPI(this.top);
   if (theAPI == null) {
      // the API wasn't found in the current window's hierarchy. If the
      // current window has an opener (was launched by another window),
      // check the opener's window hierarchy.
      if (_Debug) {
         alert("Check to see if this window has an opener.");
      }
      if (typeof(this.opener) != "undefined") {
         if (_Debug) {
            alert("This window appears to have an opener.");
         }
         if (this.opener != null) {
            if (_Debug) {
               alert("This window has an opener - looking there.");
            }
            theAPI = findAPI(this.opener.top);
	    //  Check further up if we haven't found the API yet
	    if (theAPI == null) {
	      if (typeof(this.opener.opener) != "undefined") {
		  if (this.opener.opener != null) {
		      theAPI = findAPI(this.opener.opener.top);
		  }
	      }
	    }
         } else {
            if (_Debug) {
               alert("This window doesn't have an opener.");
            }
         }
      }
   }
   return theAPI;
}