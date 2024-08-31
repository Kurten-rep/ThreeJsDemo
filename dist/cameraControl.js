// cameraControl.js
import * as THREE from 'three'; // Import Three.js

export function initCameraControl(camera, renderer, scene) {
    const keysPressed = {};

    // Track keydown events
    window.addEventListener('keydown', function(event) {
        keysPressed[event.key.toLowerCase()] = true;        
    });

    // Track keyup events
    window.addEventListener('keyup', function(event) {
        keysPressed[event.key.toLowerCase()] = false;
        document.getElementById("keyW").style.backgroundColor = "lightgray";
        document.getElementById("keyA").style.backgroundColor = "lightgray";
        document.getElementById("keyS").style.backgroundColor = "lightgray";
        document.getElementById("keyD").style.backgroundColor = "lightgray";
        document.getElementById("keyW").style.color = "black";
        document.getElementById("keyA").style.color = "black";
        document.getElementById("keyS").style.color = "black";
        document.getElementById("keyD").style.color = "black";
    });

    // Initial camera settings
    const initialPosition = new THREE.Vector3(21, 12, 20);
    const center = new THREE.Vector3(0, 0, 0);
    const radius = initialPosition.distanceTo(center);
    let theta = Math.atan2(initialPosition.z - center.z, initialPosition.x - center.x);

    // Vertical movement limits
    const minY = 5; // Lower limit for vertical position
    const maxY = 30; // Upper limit for vertical position

    function updateCameraPosition() {
        // Update angles based on key presses
        if (keysPressed['d']) {
            theta -= 0.05; // Rotate right
            document.getElementById("keyD").style.backgroundColor = "#636363";
            document.getElementById("keyD").style.color = "white";
        }
        if (keysPressed['a']) {
            theta += 0.05; // Rotate left
            document.getElementById("keyA").style.backgroundColor = "#636363";
            document.getElementById("keyA").style.color = "white";
        }
        if (keysPressed['w']) {
            camera.position.y = Math.min(maxY, camera.position.y + 0.5); // Move up with upper limit
            document.getElementById("keyW").style.backgroundColor = "#636363";
            document.getElementById("keyW").style.color = "white";
        }
        if (keysPressed['s']) {
            camera.position.y = Math.max(minY, camera.position.y - 0.5); // Move down with lower limit
            document.getElementById("keyS").style.backgroundColor = "#636363";
            document.getElementById("keyS").style.color = "white";
        }

        // Convert spherical coordinates to Cartesian coordinates
        const x = center.x + radius * Math.cos(theta);
        const z = center.z + radius * Math.sin(theta);

        camera.position.set(x, camera.position.y, z);
        camera.lookAt(center); // Keep the camera looking at the center
    }

    // Set initial camera position
    camera.position.set(
        initialPosition.x,
        initialPosition.y,
        initialPosition.z
    );
    camera.lookAt(center); // Keep the camera looking at the center


    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        updateCameraPosition(); // Update camera position based on key states
    }

    animate();
}
