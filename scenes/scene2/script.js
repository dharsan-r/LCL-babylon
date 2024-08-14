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
    camera.setPosition(new BABYLON.Vector3(0, 10, -7));
    camera.attachControl(canvas, true);


    // Create a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.9; // Reduce the light intensity


    // Create a ground
    const ground = BABYLON.MeshBuilder.CreatePlane("ground", { width: 15, height: 7 }, scene);
    ground.rotation.x = Math.PI / 2; // Rotate to make it horizontal
    ground.position.y = -1; // Position it slightly below the ball

    // Create a material for the ground and set its color to light blue
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.85, 0.9); // Light blue color
    ground.material = groundMaterial;

    // Create a ball
    const ball = BABYLON.MeshBuilder.CreateSphere("ball", { diameter: 1 }, scene);
    ball.position.y = -0.5; // Position the ball so it rests on the ground
    ball.position.z = 0;


    const box = BABYLON.MeshBuilder.CreateBox("box", { size: .9 }, scene);
    box.position.y = -0.5; // Position the cube at the same level as the ball
    box.position.x = 2; // Position the cube to the right of the ball

    const frameRate = 10;
    const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    const zSlide = new BABYLON.Animation("zSlide", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);

    const keyFrames = [];

    const keys2 = [];
    
    keyFrames.push({
        frame: 0,
        value: 2
    });

    keyFrames.push({
        frame: frameRate,
        value: -2
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: 2
    });

    keys2.push({
        frame: 3 * frameRate,
        value: 0
    })

    keys2.push({
        frame: 4 * frameRate,
        value: 2
    })

    xSlide.setKeys(keyFrames);
    zSlide.setKeys(keys2);

    scene.beginDirectAnimation(box, [xSlide, zSlide], 0, 25 * frameRate, false);


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
