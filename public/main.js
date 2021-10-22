document.head.insertAdjacentHTML("beforeend", 
`<link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#ffffff">`);

if('serviceWorker' in navigator) {
	window.addEventListener('load', async () => {
		return await navigator.serviceWorker.register("/service worker.js");
	})
}