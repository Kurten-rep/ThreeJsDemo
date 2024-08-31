// sceneSetup.js

import * as THREE from 'three'; // Import Three.js
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

// Setting up a 2D message
export function setupLabelRenderer() {
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);
    return labelRenderer;
}

// Light setup
export function createLight(name, x, y, z, intensity, reach) {
    const light = new THREE.PointLight(0xffffff, intensity, reach);
    light.position.set(x, y, z);
    light.name = name;
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 100;
    return light;
}

export function setupLights(scene) {
    const lightGroup = new THREE.Group();
    const lightOne = createLight('LightOne', 0, 12, 20, 0.4, 100);
    const lightTwo = createLight('LightTwo', 0, 12, 10, 0.4, 100);
    const lightThree = createLight('LightThree', 0, 12, 0, 0.4, 100);
    const lightFour = createLight('LightFour', 0, 12, -10, 0.4, 100);
    const lightFive = createLight('LightFive', 0, 12, -18, 0.4, 100);
    lightGroup.add(lightOne, lightTwo, lightThree, lightFour, lightFive);
    //scene.add(lightGroup);

    const spotLightEmmerald = new THREE.SpotLight(0xffffff, 2, 20, (Math.PI * 0.1));
    spotLightEmmerald.position.set(0, 10, 11);
    const spotLightGold = new THREE.SpotLight(0xffffff, 2, 20, (Math.PI * 0.1));
    spotLightGold.position.set(0, 12, -8);

    scene.add(spotLightEmmerald, spotLightGold);
    return { spotLightEmmerald, spotLightGold };
}

// Function to create a set of spheres
export function createInfoGeo(name, x, y, z) {
    const geo = new THREE.CapsuleGeometry(1, 3);
    const mat = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.name = name;
    return mesh;
}

export function setupSpheres(scene) {
    const sphereGroup = new THREE.Group();

    const sphereMesh1 = createInfoGeo('sphereMesh1', 0, 2.5, 15);
    const sphereMesh2 = createInfoGeo('sphereMesh2', 0, 2.5, -3.5);
    const emmeraldSphere = createInfoGeo('emmeraldSphere', 0, 5, 11);
    const goldSphere = createInfoGeo('goldSphere', 0, 5, -8); // Fixed name to 'goldSphere'
    const cameraPointer = createInfoGeo('cameraPointer', 0, 5, -8);
    const descripcionPerro = createInfoGeo('descripcionPerro', -10, 4, 10);

    sphereGroup.add(sphereMesh1, sphereMesh2, emmeraldSphere, goldSphere, cameraPointer, descripcionPerro);
    scene.add(sphereGroup);

    return { sphereGroup, emmeraldSphere, goldSphere };
}

// Function to setup and handle the raycaster for displaying messages
export function setupRaycaster(camera, sphereGroup) {
    const mousePos = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    window.addEventListener('mousemove', function (e) {
        mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePos.y = (e.clientY / window.innerHeight) * -2 + 1;

        raycaster.setFromCamera(mousePos, camera);
        const intersects = raycaster.intersectObject(sphereGroup);

        const p = document.querySelector('.tooltip');
        const cPointLabel = document.querySelector('.tooltipContainer');
        
        if (intersects.length > 0) {
            switch (intersects[0].object.name) {
                case 'sphereMesh1':
                    p.className = 'tooltip show';
                    cPointLabel.style.transform = 'translate(-50%, -50%)'; // Adjust position if necessary
                    p.textContent = 'Jarron Esmeralda';
                    break;
                case 'sphereMesh2':
                    p.className = 'tooltip show';
                    cPointLabel.style.transform = 'translate(-50%, -50%)'; // Adjust position if necessary
                    p.textContent = 'Descripcion del jarron dorado: Jarron hecho en blender utilizando tutoriales de youtube desde 0 Descripcion del jarron dorado: Jarron hecho en blender utilizando tutoriales de youtube desde 0';
                    break;
                case 'cameraPointer':
                    p.className = 'tooltip show';
                    cPointLabel.style.transform = 'translate(-50%, -50%)'; // Adjust position if necessary
                    p.textContent = 'Mira a Zico';
                    break;
                case 'descripcionPerro':
                    p.className = 'tooltip show';
                    cPointLabel.style.transform = 'translate(-50%, -50%)'; // Adjust position if necessary
                    p.textContent = 'Descripcion Perro';
                    break;
                default:
                    p.className = 'tooltip hide';
                    break;
            }
        } else {
            p.className = 'tooltip hide';
        }
    });
    
}
