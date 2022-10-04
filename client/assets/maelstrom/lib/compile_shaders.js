const compileShader = async(gl, key, config) => {
    const vertexText = await fetch(config.vertex).then(response => response.text( ));
    const fragmentText = await fetch(config.fragment).then(response => response.text( ));
    //
    const vertexShader = defineShader(gl, vertexText, gl.VERTEX_SHADER);
    const fragmentShader = defineShader(gl, fragmentText, gl.FRAGMENT_SHADER);
    //
    const program = defineProgram(gl, vertexShader, fragmentShader);
    //
    const attributes = getAttributes(gl, program, vertexText, fragmentText);
    const uniforms   = getUniforms(gl, program, vertexText, fragmentText);
    //
    Maelstrom.Shaders[key] = {
        program: program, 
        attributes: attributes,
        uniforms: uniforms
    }
}

const defineProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram( );
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program, gl.LINK_STATUS);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const err = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        console.log("Error - linkShaderProgram.\n================================");
        throw err;
    }
    return program;    
}

const defineShader = (gl, text, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, text);
    gl.compileShader(shader);
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    console.error(text,'\n');
    throw `Could not compile shader [${type}].\n${gl.getShaderInfoLog(shader)}`; 
}

const findParameter = ( text, parameter) => {
    const regex = new RegExp(`(?<=${parameter} ).*`, 'g');
    const results = text.match(regex);
    const params  =  results ? results.map( x => x.substring(x.lastIndexOf(' ') + 1, x.length - 1)) : [];
    return params;
}

const getAttributes = (gl, program, vertex, fragment) => {
    let keys = [].concat(findParameter(vertex, 'attribute'), findParameter(fragment, 'attribute'));
    let source = [...new Set(keys).values( )];
    let result = { };
    for(const key of source) result[key] = gl.getAttribLocation(program, key);
    return result;
}

const getUniforms = (gl, program, vertex, fragment) => {
    let keys = [].concat(findParameter(vertex, 'uniform'), findParameter(fragment, 'uniform'));
    let source = [...new Set(keys).values( )];
    let result = { };
    for(const key of source) result[key] = gl.getUniformLocation(program, key);
    return result;
}


export default async function compileShaders( ) {
    const gl = Maelstrom.gl;
    Maelstrom.Shaders = { };
    const shaderConfig = await fetch('/assets/shader/config.json').then(res => res.json( ));
    for(const key in shaderConfig) await compileShader(gl, key, shaderConfig[key]);
}



