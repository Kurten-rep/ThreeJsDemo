import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { initCameraControl } from './cameraControl.js';
import { createGoldVaseScene } from './goldVaseScene.js';
import { createEmmeraldVaseScene } from './emmeraldVaseScene.js';
import { createcuadro1Scene } from './cuadro1Scene.js';
import { createcuadro2Scene } from './cuadro2Scene.js';
import { createcuadro3Scene } from './cuadro3Scene.js';


const loader = new GLTFLoader()
loader.load('./Public/Models/MuseumFinal.gltf',
    (gltf) =>{
        scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
    }, (xhr) =>{
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
    },
    (error) =>{
        console.log( 'An error happened' );
})


//Setting up the renderer
const w = window.innerWidth
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
///// Setting up the camera
const fov = 55;
const aspect = w/h;
const near = 0.1
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 21;
camera.position.y = 12;
camera.position.z = 20;
camera.lookAt(0,0,0)


///////////////////////////////////Crear las escenas
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080);

const goldVaseScene = createGoldVaseScene();
const emmeraldVaseScene = createEmmeraldVaseScene();
const cuadro1Scene = createcuadro1Scene();
const cuadro2Scene = createcuadro2Scene();
const cuadro3Scene = createcuadro3Scene();
///////////// Light

function createLight(name, x, y, z, intensity, reach){
    const light = new THREE.PointLight(0xffffff, intensity, reach);
    light.position.set(x, y, z);
    light.name = name;
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 100;
    return light;
}

const lightGroup = new THREE.Group();
const lightOne = createLight('LightOne', 0, 12, 20, 0.4, 100);
const lightTwo = createLight('LightTwo', 0, 12, 10, 0.4, 100);
const lightThree = createLight('LightThree', 0, 12, 0, 0.4, 100);
const lightFour = createLight('LightFour', 0, 12, -10, 0.4, 100);
const lightFive = createLight('LightFive', 15, 12, -18, 0.4, 50);
lightGroup.add(lightOne);
lightGroup.add(lightTwo);
lightGroup.add(lightThree);
lightGroup.add(lightFour);
lightGroup.add(lightFive);
let lightG1State = true;
let lightG2State = true;
let lightG3State = true;
scene.add(lightGroup)


const spotLightEmmerald = new THREE.SpotLight( 0xffffff, 2, 200, (Math.PI * 0.1));
spotLightEmmerald.position.set( 0, 10, 11);
const spotLightGold = new THREE.SpotLight( 0xffffff, 2, 200, (Math.PI * 0.1));
spotLightGold.position.set( 0, 12, -8);
const spotLightCuadro1 = new THREE.SpotLight( 0xffffff, 0.5, 100, (Math.PI * 0.2));
spotLightCuadro1.position.set( -5, 5, 11);
const spotLightCuadro2 = new THREE.SpotLight( 0xffffff, 0.5, 100, (Math.PI * 0.2));
spotLightCuadro2.position.set( -5, 5, -8.1);
const spotLightCuadro3 = new THREE.SpotLight( 0xffffff, 0.5, 100, (Math.PI * 0.25));
spotLightCuadro3.position.set( 0, 5, -15.5);

scene.add( spotLightEmmerald );
scene.add( spotLightGold );
scene.add( spotLightCuadro1 );
scene.add( spotLightCuadro2 );
scene.add( spotLightCuadro3 );

//////////////// Handling Resize
function onWindowResize() {
    // Update camera aspect ratio and renderer size
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

// Add event listener for window resize
window.addEventListener('resize', onWindowResize);


//////////Setting a 2D message

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(w, h);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);


///////////////// Function to create a set of spheres

function createInfoGeo(name, x, y, z){
    const geo = new THREE.CapsuleGeometry(1, 3);
    const mat = new THREE.MeshBasicMaterial({color: 0xFF00FF});
    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(x, y, z);
    mesh.name = name;
    return mesh;
}

///////////////Create a group holding all Spheres

const sphereGroup = new THREE.Group();


/////////////Contenedores y triggers

const infoJarronEsmeralda = createInfoGeo('infoJarronEsmeralda', 0, 2.5, 15);
const infoJarronOro = createInfoGeo('infoJarronOro', 0, 2.5, -3.5);
const infoCuadro1 = createInfoGeo('infoCuadro1', -9.5, 10.2, 10.7);
const infoCuadro2 = createInfoGeo('infoCuadro2', -10, 10.2, -8.2);
const infoCuadro3 = createInfoGeo('infoCuadro3', -0.3, 10.2, -20);

const verCuadro1 = createInfoGeo('verCuadro1', -9.5, 5, 10.8);
const verCuadro2 = createInfoGeo('verCuadro2', -9.5, 5, -8.2);
const verCuadro3 = createInfoGeo('verCuadro3', -0.3, 5, -20);

const lightSwitch1 = createInfoGeo('lightSwitch1', 9, 5, -20);
const lightSwitch2 = createInfoGeo('lightSwitch2', 6.9, 5, -20);
const lightSwitch3 = createInfoGeo('lightSwitch3', 4.8, 5, -20);

sphereGroup.add(infoJarronEsmeralda);
sphereGroup.add(infoJarronOro);
sphereGroup.add(infoCuadro1);
sphereGroup.add(infoCuadro2);
sphereGroup.add(verCuadro1);
sphereGroup.add(verCuadro2);
sphereGroup.add(verCuadro3);

sphereGroup.add(lightSwitch1);
sphereGroup.add(lightSwitch2);
sphereGroup.add(lightSwitch3);

sphereGroup.add(infoCuadro3);

sphereGroup.visible = false;
scene.add(sphereGroup)

////////////////////Luces items del museo
const emmeralSpotLight = createInfoGeo('emmeralSpotLight', 0, 5, 11);
const goldSpotLight = createInfoGeo('goldSpotLight', 0, 5, -8);
spotLightEmmerald.target = emmeralSpotLight;
spotLightGold.target = goldSpotLight;
spotLightCuadro1.target = verCuadro1;
spotLightCuadro2.target = verCuadro2;
spotLightCuadro3.target = verCuadro3;
sphereGroup.add(emmeralSpotLight);
sphereGroup.add(goldSpotLight);


///////////Creating a paragraph, setting a class, wrapping it in a div

const p = document.createElement('p');
p.className = "tooltip";
const pContainer = document.createElement('div');
pContainer.className = "tooltipContainer"
pContainer.appendChild(p);
const cPointLabel = new CSS2DObject(pContainer);
scene.add(cPointLabel)

///////////preparing the RayCaster

const mousePos = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

/////////////////DISPLAYING THE MESSAGE 
window.addEventListener('mousemove', function(e) {
    mousePos.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePos.y = (e.clientY / this.window.innerHeight) * -2 + 1;

    raycaster.setFromCamera(mousePos, camera);
    const intersects = raycaster.intersectObject(sphereGroup);    

    if(intersects.length > 0 && sceneSelector == 0){
        switch (intersects[0].object.name) {
            case 'infoJarronEsmeralda':
                p.className = 'tooltip show';
                cPointLabel.position.set(0, 2.5, 15);
                p.textContent = 'La piedra de jade no sólo es conocida por su belleza y por utilizarse para fabricar hermosas joyas, sino también por ser una de las piedras preciosas más apreciadas desde hace siglos por sus propiedades energéticas. Es una piedra preciosa que ha viajado durante siglos, desde su descubrimiento en Sudamérica hasta la cultura oriental, y también es conocida por sus propiedades curativas. En este artículo hablaremos de su historia, origen y composición, sus propiedades y virtudes más importantes y para qué se utiliza hoy en día.'
                break;
            case 'infoJarronOro':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(0, 2.5, -3.5);
                    p.textContent = 'El Poporo Quimbaya es un recipiente procedente del noroeste antioqueño, el cual era empleado por las comunidades indígenas para almacenar cal en polvo o coca triturada con ceniza de hojas de yarumo, muy utilizadas en el ritual del mambeo.'
                break;
            case 'infoCuadro1':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(-10, 9.5, 10);
                    p.textContent = 'FRANCISCO ANTONIO CANO (1865 – 1935), En su obra predominan motivos decididamente colombianos, en especial de su natal Antioquia, que abarcan desde paisajes hasta bodegones con flores locales.'
                break;
            case 'infoCuadro2':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(-10, 9.5, -8);
                    p.textContent = 'PEDRO NEL GÓMEZ (1889 – 1984), Gómez abordó los problemas provocados por la desigualdad, como la migración de los campesinos a las urbes o la explotación en las minas. En sus pinturas destaca su singular forma de capturar la luz a través del uso de líneas, lo que evoca las técnicas utilizadas por los muralistas mexicanos.'
                break;
            case 'infoCuadro3':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(0, 9.5, -20);
                    p.textContent = 'El Instituto Distrital de las Artes – Idartes, como gestor de las prácticas artísticas en Bogotá, está comprometido con aumentar la confianza de los artistas, gestores y ciudadanía en el sector de las artes en Bogotá a través de un esfuerzo continuo de mejora en su gestión con criterios de eficiencia, eficacia y efectividad.'
                break;
            case 'emmeralSpotLight':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(0, 5, 11);
                    p.textContent = 'ver Jarron Esmeralda'
                break;
            case 'goldSpotLight':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(0, 5, -8);
                    p.textContent = 'ver Jarron Oro'
                break;
            case 'verCuadro1':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(-10, 4.7, 10);
                    p.textContent = 'ver Cuadro'
                break;
            case 'verCuadro2':
                p.className = 'tooltip show';
                cPointLabel.position.set(-10, 4.7, -8);
                p.textContent = 'ver Cuadro'
            break;
            case 'verCuadro3':
                    p.className = 'tooltip show';
                    cPointLabel.position.set(0, 4.7, -20);
                    p.textContent = 'ver Cuadro'
            break;
            case 'lightSwitch1':
                p.className = 'tooltip show';
                cPointLabel.position.set(9, 5, -20);
                p.textContent = 'Luz 1 y 2'
                break;
            case 'lightSwitch2':
                p.className = 'tooltip show';
                cPointLabel.position.set(6.9, 5, -20);
                p.textContent = 'Luz 3 y 4'
                break;
            case 'lightSwitch3':
                p.className = 'tooltip show';
                cPointLabel.position.set(4.8, 5, -20);
                p.textContent = 'Luces mostrador'
                break;
                          
            default:
                break;
        }}
        else{
            p.className = "tooltip hide";
        }
})

/////////////////////////Moving the camera
initCameraControl(camera, renderer, scene);
/////Toggling the scene

////////////// Second raycaster on click

const raycaster2 = new THREE.Raycaster();
const mouse = new THREE.Vector2();

////////////////// Click event handler
function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster2.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(sphereGroup);

    if(intersects.length > 0 && sceneSelector == 0){
        switch (intersects[0].object.name) {
            case 'goldSpotLight':
                metalSound.play();
                currentScene = goldVaseScene; // Switch to the goldVaseScene
                initCameraControl(camera, renderer, currentScene);
                sceneSelector = 1;
                break;
            case 'emmeralSpotLight':
                metalSound.play();
                currentScene = emmeraldVaseScene; // Switch to the emmeraldScene
                initCameraControl(camera, renderer, currentScene);
                sceneSelector = 2;
                break;
            case 'verCuadro1':
                woodSound.play();
                currentScene = cuadro1Scene; // Switch to the Cuadro1Scene
                initCameraControl(camera, renderer, currentScene);
                sceneSelector = 3;
                break;
            case 'verCuadro2':
                woodSound.play();
                currentScene = cuadro2Scene; // Switch to the Cuadro2Scene
                initCameraControl(camera, renderer, currentScene);
                sceneSelector = 4;
                break;
            case 'verCuadro3':
                woodSound.play();
                currentScene = cuadro3Scene; // Switch to the Cuadro3Scene
                initCameraControl(camera, renderer, currentScene);
                sceneSelector = 5;
                break;
            case 'lightSwitch1':
                clickSound.play();
                lightG1State = !lightG1State;
                lightOne.visible = lightG1State;
                lightTwo.visible = lightG1State;
                console.log(lightG1State);

                break;
            case 'lightSwitch2':
                clickSound.play();
                lightG2State = !lightG2State;
                lightThree.visible = lightG2State;
                lightFour.visible = lightG2State;
                console.log(lightG2State);
                break;
            case 'lightSwitch3':
                clickSound.play();
                lightG3State = !lightG3State;
                spotLightEmmerald.visible = lightG3State;
                spotLightGold.visible = lightG3State;
                spotLightCuadro1.visible = lightG3State;
                spotLightCuadro2.visible = lightG3State;
                spotLightCuadro3.visible = lightG3State;
                console.log(lightG3State);
                break;
            default:
                break;
    }
}}

//////////Close button event
closeButton.addEventListener('click', () => {
    sceneSelector = 0;
    currentScene = scene;
    initCameraControl(camera, renderer, currentScene);
    if(sceneSelector == 0){
        console.log("DefaultScene");
        window.location.reload();
    }
});

window.addEventListener('click', onClick);

// Set currentScene to the initial scene
let currentScene = scene;
let sceneSelector = 0;



/////////////////////////////////// SONIDOS
// Load the sounds
const listener = new THREE.AudioListener();
camera.add(listener);

const clickSound = new THREE.Audio(listener);
const metalSound = new THREE.Audio(listener);
const woodSound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();

audioLoader.load('./sounds/clickSound.mp3', function(buffer) {
    clickSound.setBuffer(buffer);
    clickSound.setVolume(0.3);
});

audioLoader.load('./sounds/metalSound.mp3', function(buffer) {
    metalSound.setBuffer(buffer);
    metalSound.setVolume(0.2);
});

audioLoader.load('./sounds/woodSound.mp3', function(buffer) {
    woodSound.setBuffer(buffer);
    woodSound.setVolume(0.2);
});
/////////////////////////////////////


function animate() {
    labelRenderer.render(scene, camera);

	renderer.render(currentScene, camera );
}
renderer.setAnimationLoop( animate );