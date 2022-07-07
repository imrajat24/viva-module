import pipwerks from "./scromWrapper";
var scorm = pipwerks.SCORM;
var lmsConnected = false;
let id, scormId;
// Core LMS Functions
export function scormLogic() {
  //scorm.init returns a boolean
  lmsConnected = scorm.init();
  console.log(lmsConnected);

  if (lmsConnected) {
    id = scorm.get("cmi.core.student_id");
    console.log(id);
    var url = document.referrer;
    // let url =
    //   "https://spicelearnweb.xrcstaging.in/mod/scorm/loadSCO.php?a=320&scoid=640&currentorg=CourseID-org&mode=&attempt=12";
    console.log(url);
    scormId = parseInt(url.substr(url.indexOf("=") + 1, 3));
    console.log(scormId);
    scorm.quit();
    console.log("quit");
  } else {
    console.log("Could not connect to lms");
  }
  return [id, scormId];
}
