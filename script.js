let capsules = [];

document.addEventListener("DOMContentLoaded", displayCapsules);

function createCapsule() {
  var message = document.getElementById("message").value;
  var unlockDate = new Date(document.getElementById("unlockDate").value);
  var mediaFiles = document.getElementById("mediaUpload").files;

  if (!message || isNaN(unlockDate)) {
    alert("Please provide both a message and a valid unlock date!");
    return;
  }

  var media = [];
  for (var i = 0; i < mediaFiles.length; i++) {
    var fileURL = URL.createObjectURL(mediaFiles[i]);
    media.push(fileURL);
  }

  capsules.push([message, unlockDate.toString(), media, false]);
  displayCapsules();
  resetForm();
}

function unlockCapsule(index) {
  var now = new Date();
  var unlockDate = new Date(capsules[index][1]);

  if (now >= unlockDate) {
    capsules[index][3] = true;
    displayCapsules();
    alert("Message: " + capsules[index][0]);
  } else {
    alert("This capsule is still locked. Try again later!");
  }
}

function displayCapsules() {
  var capsuleList = document.getElementById("capsuleList");
  capsuleList.innerHTML = "";

  for (var i = 0; i < capsules.length; i++) {
    var unlockDate = new Date(capsules[i][1]).toLocaleString();
    var status = capsules[i][3] ? "Unlocked" : "Locked";

    var mediaContent = "";
    if (capsules[i][3]) {
      for (var j = 0; j < capsules[i][2].length; j++) {
        mediaContent += '<img src="' + capsules[i][2][j] + '" alt="Media" style="max-width: 400px; margin-right: 10px;">';
      }
    } else {
      mediaContent = capsules[i][2].length > 0 ? "<span>Media is hidden until unlocked</span>" : "<span>No media added</span>";
    }

    var li = document.createElement("li");
    li.innerHTML = '<span>Capsule - Unlock Date: ' + unlockDate + ' (' + status + ')</span>' + mediaContent + '<button onclick="unlockCapsule(' + i + ')">Unlock</button>';
    capsuleList.appendChild(li);
  }
}

function clearData() {
  capsules = [];
  displayCapsules();
}

function resetForm() {
  document.getElementById("message").value = "";
  document.getElementById("unlockDate").value = "";
  document.getElementById("mediaUpload").value = "";
}












