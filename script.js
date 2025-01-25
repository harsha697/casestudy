let capsules = JSON.parse(localStorage.getItem("capsules")) || [];

function createCapsule() {
  const message = document.getElementById("message").value;
  const unlockDate = new Date(document.getElementById("unlockDate").value);
  const mediaFiles = document.getElementById("mediaUpload").files;

  if (!message || isNaN(unlockDate.getTime())) {
    alert("Please fill in all required fields!");
    return;
  }

  const capsule = {
    message: message,
    unlockDate: unlockDate.toISOString(),
    media: [],
    isUnlocked: false,
  };

  if (mediaFiles.length > 0) {
    for (let i = 0; i < mediaFiles.length; i++) {
      capsule.media.push(URL.createObjectURL(mediaFiles[i]));
    }
  }

  capsules.push(capsule);
  saveCapsules();
  renderCapsules();
  document.getElementById("message").value = "";
  document.getElementById("unlockDate").value = "";
  document.getElementById("mediaUpload").value = "";
}

function unlockCapsule(index) {
  const now = new Date();
  const unlockDate = new Date(capsules[index].unlockDate);

  if (now >= unlockDate) {
    capsules[index].isUnlocked = true;
    saveCapsules();
    renderCapsules();
    alert(`Your message: "${capsules[index].message}"`);
  } else {
    alert("This capsule is still locked!");
  }
}

function saveCapsules() {
  localStorage.setItem("capsules", JSON.stringify(capsules));
}

function renderCapsules() {
  const capsuleList = document.getElementById("capsuleList");
  capsuleList.innerHTML = "";

  capsules.forEach((capsule, index) => {
    const li = document.createElement("li");
    const unlockDate = new Date(capsule.unlockDate).toLocaleString();
    const status = capsule.isUnlocked ? "Unlocked" : "Locked";
    
    let mediaContent = '';
    if (capsule.isUnlocked && capsule.media.length > 0) {
      capsule.media.forEach(file => {
        mediaContent += `<img src="${file}" alt="Media" style="max-width: 400px; margin-right: 10px;">`;
      });
    } else if (capsule.media.length === 0) {
      mediaContent = `<span>No media added</span>`;
    } else {
      mediaContent = `<span>Media is hidden until unlocked</span>`;
    }

    li.innerHTML = `
      <span>Capsule - Unlock Date: ${unlockDate} (${status})</span>
      ${mediaContent}
      <button onclick="unlockCapsule(${index})">Unlock</button>
    `;

    capsuleList.appendChild(li);
  });
}

function clearData() {
  localStorage.removeItem("capsules");
  capsules = [];
  renderCapsules();
}

renderCapsules();












