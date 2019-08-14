export default class ProgUtil {
    static createShader(gl, type, src) {
        //Create Shader
        let shader = gl.createShader(type)
        //Set source
        gl.shaderSource(shader, src)
        //Compile
        gl.compileShader(shader)
        //Check for errors
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader
    }
    static createProgram(gl, ...shaders) {
        //Create program
        let program = gl.createProgram()
        //Add all shaders to program
        shaders.forEach(shader => {
            gl.attachShader(program, shader)
        })
        //Link
        gl.linkProgram(program)
        //Check for errors
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
            return null;
        }
        return program
    }
}