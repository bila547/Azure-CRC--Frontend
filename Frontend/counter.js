async function getVisitorCount() {
    try {
        const response = await fetch('https://bilalfunctioncanadacentral.azurewebsites.net/api/http_triggerbilal?code=cfBRhS2N_bLseDR8utYmU-FFtHgvH2B8mHXT33-8JapWAzFukeI9sA%3D%3D');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        
        const text = await response.text(); // Get response as text since it's a string
        console.log('Full API Response:', text); // Log full response for debugging

        // Extract the count from the string using a regex
        const match = text.match(/Current count: (\d+)/);
        if (match) {
            return parseInt(match[1], 10); // Return the count as an integer
        } else {
            throw new Error('Could not extract visitor count from the response');
        }
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        return null;
    }
}

async function updateVisitorCount() {
    const currentCount = await getVisitorCount();
    if (currentCount !== null) {
        document.getElementById('counter').innerText = currentCount; // Update the displayed count
    } else {
        document.getElementById('counter').innerText = 'Unable to retrieve visitor count at the moment.';
    }
}

// Call this function on page load or at intervals
document.addEventListener('DOMContentLoaded', () => {
    updateVisitorCount();
    setInterval(updateVisitorCount, 60000); // Update every minute
});

