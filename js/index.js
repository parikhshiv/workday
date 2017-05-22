const apiBaseUrl = 'https://riipen.mediacore.tv/api2/media';

$.ajax({
	url: apiBaseUrl,
})
.then(setupPage);

function setupPage(resp) {
	const videos = resp.items.map((item) => {
		return {
			id: item.id,
			title: item.title,
			description: item.description,
		};
	});

	const iframe = document.querySelector('iframe');
	const title = document.querySelector('.title');
	const description = document.querySelector('.description');
	const backButton = document.querySelector('.back');
	const skipButton = document.querySelector('.skip');
	
	let videoIdx = 0;

	updateIframe();

	function updateIframe() {
		const currentVideo = videos[videoIdx];

		iframe.src = apiBaseUrl + `/${currentVideo.id}/embed`;

		const player = new playerjs.Player(iframe);
		player.on('ready', () => {
			player.on('ended', (e) => {
				e.preventDefault();
				videoIdx = (videoIdx + 1) % videos.length;
				updateIframe();
			});

			player.play();
		});

		title.innerHTML = currentVideo.title;
		description.innerHTML = currentVideo.description;
	}

	backButton.addEventListener('click', (e) => {
		e.preventDefault();
		videoIdx = (videos.length + videoIdx - 1) % videos.length;
		console.log(videoIdx);
		updateIframe();
	});

	skipButton.addEventListener('click', (e) => {
		e.preventDefault();
		videoIdx = (videoIdx + 1) % videos.length;
		console.log(videoIdx);
		updateIframe();
	});

	
}