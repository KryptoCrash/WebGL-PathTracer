//IMPORTS
import ProgUtil from './progUtil.js'
import RenderLoop from "./renderLoop.js";

//Get Canvas and Context
var canvas = document.getElementById('glcanvas')
var gl = canvas.getContext('webgl');

//Check compatibility
if(!gl) {
    gl = canvas.getContext('experimental-webgl')
    if(!gl) {
        alert('ERROR: Browser does not support WebGL')
    }
}



//Create Vertex Shader Source
var vertexSource = 
`
    attribute vec3 vertexPos;
    uniform float pointSize;

    void main() {
        gl_PointSize = pointSize;
        gl_Position = vec4(vertexPos, 1.0);
    }
`

//Create Fragment Shader Source
var fragmentSource = 
`
    precision highp float;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`

//Resize to browser size
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height)

//Set background to black
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

//Create Program
let WebGLProg = ProgUtil.createProgram(
    gl,
    ProgUtil.createShader(gl, gl.VERTEX_SHADER, vertexSource),
    ProgUtil.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
)

//Get locations of variables in program
gl.useProgram(WebGLProg)
var vertexPosLocation = gl.getAttribLocation(WebGLProg, 'vertexPos')
var pointSizeLocation = gl.getUniformLocation(WebGLProg, 'pointSize')

//Create Vertex
var VertexArr = new Float32Array([0, 0, 0, 0.5, -0.5, 0])
//Create Buffer to pass data to shader
let VertexBuffer = gl.createBuffer()
//Bind Buffer for vertex attribs
gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer)
//Allocates data for the buffer and stores it
gl.bufferData(gl.ARRAY_BUFFER, VertexArr, gl.STATIC_DRAW)


//Enable attributes to be used
gl.enableVertexAttribArray(vertexPosLocation);
//Set buffer for attribute to get data from
gl.vertexAttribPointer(vertexPosLocation, 3, gl.FLOAT, false, 0, 0)


//RENDER LOOP

//Init variables
var gPointSize = 0
var gPointStep = 2

//Create Loop
var loop = new RenderLoop(callback).start();

//Create callback for loop
function callback(dt) {
    //Set size of vertex
    gPointSize += gPointStep * dt
    gl.uniform1f(pointSizeLocation, Math.sin(gPointSize) * 50)
    //Clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    //Draw
    gl.drawArrays(gl.POINTS, 0, VertexArr.length/3)
}