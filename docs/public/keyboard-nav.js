document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('keydown', (event) => {
		// Ignore if user is typing in an input, textarea, or contenteditable element
		if (
			event.target.matches('input, textarea, [contenteditable="true"]') ||
			event.ctrlKey ||
			event.metaKey ||
			event.altKey
		) {
			return;
		}

		// Find pagination links
		const pagination = document.querySelector('.pagination-links');
		if (!pagination) return;

		if (event.key === 'p' || event.key === 'P') {
			// Navigate to previous page
			const prevLink = pagination.querySelector('a[rel="prev"]');
			if (prevLink) {
				event.preventDefault();
				window.location.href = prevLink.href;
			}
		} else if (event.key === 'n' || event.key === 'N') {
			// Navigate to next page
			const nextLink = pagination.querySelector('a[rel="next"]');
			if (nextLink) {
				event.preventDefault();
				window.location.href = nextLink.href;
			}
		}
	});
});
