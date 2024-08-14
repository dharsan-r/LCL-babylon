// Get the canvas element from the DOM
const canvas = document.getElementById("renderCanvas");

// Initialize Babylon.js engine
const engine = new BABYLON.Engine(canvas, true);

// Create the scene
const createScene = () => {
    // Create a basic Babylon.js scene object
    const scene = new BABYLON.Scene(engine);

    // Create a camera and position it
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 5, -10));
    camera.attachControl(canvas, true);

    // Create a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Create a ground
    const ground = BABYLON.MeshBuilder.CreatePlane("ground", {width: 10, height: 5}, scene);
    ground.rotation.x = Math.PI / 2; // Rotate to make it horizontal
    ground.position.y = -1; // Position it slightly below the ball

    // Create a material for the ground and set its color to light blue
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.68, 0.85, 0.9); // Light blue color
    ground.material = groundMaterial;

    // Create a ball
    const ball = BABYLON.MeshBuilder.CreateSphere("ball", {diameter: 1}, scene);
    ball.position.y = 0; // Position the ball above the ground
    ball.position.z = 0;

    return scene;
};

// Call the createScene function
const scene = createScene();

// Register a render loop to continuously render the scene
engine.runRenderLoop(() => {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
    engine.resize();
});
