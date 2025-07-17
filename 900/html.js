var runonce = "false"; // changes to "true" once the exploit has been run
var payloadFile = './payloads/hen/goldhen.bin'; // default payload
var payloadTitle = 'GoldHEN v2.4b18.3';
var message = 'Lapse exploiting console and injecting ';

function showMessage(msg) {
    // Only update message text — not the whole #message container
    const statusText = document.getElementById("statusText");
    if (statusText) {
        statusText.innerHTML = "<h1>" + msg + "</h1>";
    }
    document.getElementById("message").style.display = 'block';
}

function cachepage() {
    if (window.applicationCache.status == '0') {
        window.location.replace("./cache.html");
    }
    else {
    	showMessage("Cache is already installed");
    }
}

function callalert() {
    showMessage("Please wait, Attempting to inject: " + payloadTitle);
    import('./alert.mjs');
}

function goldhen() {
    payloadFile = './payloads/hen/goldhen.bin';
    payloadTitle = 'GoldHEN v2.4b18.3';
    callalert();
}

function vtx() {
    payloadFile = './payloads/hen/ps4-hen-900-vtx.bin';
    payloadTitle = 'PS4HEN v2.1.5';
    callalert();
}

function historyblocker() {
    payloadFile = './payloads/blockers/historyblocker.bin';
    payloadTitle = 'History Blocker';
    callalert();
}

function disabledupdates() {
    payloadFile = './payloads/blockers/disableupdates.bin';
    payloadTitle = 'Disable Updates';
    callalert();
}

function enableupdates() {
    payloadFile = './payloads/blockers/enableupdates.bin';
    payloadTitle = 'Enable Updates';
    callalert();
}

function bloader() {
    payloadTitle = 'Binloader';
    callalert();
}

function dumpG() {
    payloadFile = './payloads/dumpers/dumperG.bin';
    payloadTitle = 'Game Dumper';
    callalert();
}

function dumpU() {
    payloadFile = './payloads/dumpers/dumperU.bin';
    payloadTitle = 'Game Update Dumper';
    callalert();
}

function dumpGU() {
    payloadFile = './payloads/dumpers/dumperGU.bin';
    payloadTitle = 'Game and Update Dumper';
    callalert();
}

function dumpM() {
    payloadFile = './payloads/dumpers/dumperM.bin';
    payloadTitle = 'Dump and Merge Game + Update';
    callalert();
}

function dbbackup() {
    payloadFile = './payloads/database/backup.bin';
    payloadTitle = 'Database backup';
    callalert();
}

function dbrestore() {
    payloadFile = './payloads/database/restore.bin';
    payloadTitle = 'Database restore';
    callalert();
}

//function not called for now, keep incase I want to use in the future...
function reset() {
    const checkbox = document.getElementById('myCheckbox');
    if (checkbox) {
        checkbox.checked = false;
        localStorage.setItem('checkboxState', 'false');
    }
}

//checkbox sections
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('myCheckbox');
    const checkbox2 = document.getElementById('myCheckbox2');

    // Load saved checkbox state from localStorage
    const savedState = localStorage.getItem('checkboxState');
    const savedState2 = localStorage.getItem('checkboxState2');

    if (savedState !== null && checkbox) {
        checkbox.checked = savedState === 'true';
        onCheckboxChange(checkbox.checked);
    }

    if (savedState2 !== null && checkbox2) {
        checkbox2.checked = savedState2 === 'true';
        onCheckboxChange2(checkbox2.checked);
    }

    // Save checkbox state and optionally trigger action
    if (checkbox) {
        checkbox.addEventListener('change', function () {
            localStorage.setItem('checkboxState', checkbox.checked);
            onCheckboxChange(checkbox.checked);
        });
    }

    if (checkbox2) {
        checkbox2.addEventListener('change', function () {
            localStorage.setItem('checkboxState2', checkbox2.checked);
            onCheckboxChange2(checkbox2.checked);
        });
    }

    function onCheckboxChange(isChecked) {
        if (isChecked) {
            goldhen();
        }
    }

    function onCheckboxChange2(isChecked) {
        if (isChecked) {
            vtx();
        }
    }
});
