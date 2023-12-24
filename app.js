document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const motionDetected = document.getElementById('motion-detected');

    // Check if the browser supports accessing the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Access the user's camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;

                // Set up motion detection
                const tracker = new tracking.ObjectTracker('face');
                tracker.setInitialScale(4);
                tracker.setStepSize(2);
                tracker.setEdgesDensity(0.1);

                tracking.track('#video', tracker, { camera: true });

                tracker.on('track', function (event) {
                    if (event.data.length > 0) {
                        // Motion detected
                        motionDetected.style.display = 'block';
                    } else {
                        // No motion detected
                        motionDetected.style.display = 'none';
                    }
                });
            })
            .catch(function (error) {
                console.error('Error accessing the camera:', error);
            });
    } else {
        console.error('Camera access not supported in this browser.');
    }
});
