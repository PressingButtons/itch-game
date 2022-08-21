export default function compileShader(gl, src) {

    const step01_gather_resources = obj => {
        if(typeof obj == "string") return step02_load_config(obj);
        return step03_get_shaders(obj);
    }

    const step02_load_config = url => {
        return GameSystem.loadJSON(url);
    }

    const step03_get_shaders = async obj => {
        const vertex = await GameSystem.loadText(obj.vertex);
        const fragment = await GameSystem.loadText(obj.fragment);
        return step04_link_shaders(vertex, fragment);
    }

    const step04_link_shaders(vertex, fragment) {
        const program = gl.createProgram( );
        gl.attachShader(program, generateShader(gl, vertex, gl.VERTEX_SHADER));
        gl.attachShader(program, generateShader(gl, fragment, gl.FRAGMENT_SHADER));
        gl.linkProgram(program);
        if(gl.getProgramParameter(program, gl.LINK_STATUS)) return step05_package_program(program, vertex, fragment);
        const err = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        console.log("Error - linkShaderProgram.\n================================");
        throw err;
    }

    const step05_package_program = (program, vertex, fragment) => {
        const attributes = getAttributes(vertex, fragment);
        const uniforms = getUniforms(vertex, fragment);
        return {
            program: program, 
            attributes: attributes,
            uniforms: uniforms
        }
    }

    return step01_gather_resources(src);

}

const findParameter = (text, parameter) => {
    const regex = new RegExp(`(?<=${parameter} ).*`, 'g');
    const results = text.match(regex);
    const params  =  results ? results.map( x => x.substring(x.lastIndexOf(' ') + 1, x.length - 1)) : [];
    return params;
  }
}

const generateShader = (gl, src, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    console.error(text,'\n');
    throw `Could not compile shader [${type}].\n${gl.getShaderInfoLog(shader)}`;
}

const getAttributes = (program, vertex, fragment) => {
    let keys = [].concat(findParameter(vertex, 'attribute'), findParameter(fragment, 'attribute'));
    let source = [...new Set(keys).values( )];
    let result = { };
    for(const key of keys) result[key] = gl.getAttribLocation(program, key);
}

const getUniforms = (program, vertex, fragment) => {
    let keys = [].concat(findParameter(vertex, 'uniform'), findParameter(fragment, 'uniform'));
    let source = [...new Set(keys).values( )];
    let result = { };
    for(const key of keys) result[key] = gl.getUniformLocation(program, key);
}