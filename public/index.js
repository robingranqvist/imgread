const btn = document.querySelector('button');
let imgUrl = document.getElementById("imgurl");
let processed = document.querySelector('.processed-content');
let loadingDiv = document.querySelector('.loading');

let formContainer = document.querySelector('.form-container');


btn.addEventListener('click', () => {
    getTranscription();
    hideForm();
});

// Get the transcription
async function getTranscription() {
    await fetch('api/transcribe', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            url: imgUrl.value,
        })
    },
    showLoading(true))
    .then(res => res.json())
    .then(
        resJson => setupProcessedScreen(resJson),
    )
    .catch(err => console.log(err));
}

function setupProcessedScreen (data) {
    processed.style.display = 'block';
    processed.innerHTML = data;
    showLoading(false);
}

function showLoading(show) {
    if (show) { loadingDiv.style.display = 'flex'; } else { loadingDiv.style.display = 'none'; }
}

function hideForm() {
    formContainer.style.display = 'none';
}