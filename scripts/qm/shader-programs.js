
let vShader;

let realTimeStepProgram;
let imagTimeStepProgram;
let initialWaveProgram;
let initPotentialProgram;
let shapePotentialProgram;
let displayProgram;
let copyToProgram;
let probDensityProgram;
let probCurrentProgram;
let staggeredProbDensityProgram;
let staggeredProbCurrentProgram;
let jacobiIterProgram;
let cnExplicitPartProgram;
let onesProgram;
let complexMultiplyProgram;
let expPotentialProgram;
let imagePotentialProgram;
let rearrangeProgram;
let fftIterProgram;
let initVectorPotentialProgram;


function initPrograms() {

    vShader = makeShader(gl.VERTEX_SHADER, vertexShaderSource);
    let realTimeStepShader = makeShader(gl.FRAGMENT_SHADER,
                                        realTimestepFragmentSource);
    realTimeStepProgram = makeProgram(vShader, realTimeStepShader);
    let imagTimeStepShader = makeShader(gl.FRAGMENT_SHADER,
                                        imagTimestepFragmentSource);
    imagTimeStepProgram = makeProgram(vShader, imagTimeStepShader);
    let initialWaveShader = makeShader(gl.FRAGMENT_SHADER,
                                        initialWavepacketFragmentSource);
    initialWaveProgram = makeProgram(vShader, initialWaveShader);
    let initPotentialShader = makeShader(gl.FRAGMENT_SHADER,
                                            initialPotentialFragmentSource);
    initPotentialProgram = makeProgram(vShader, initPotentialShader);
    let reshapePotentialShader = makeShader(gl.FRAGMENT_SHADER,
                                            reshapePotentialFragmentSource);
    shapePotentialProgram = makeProgram(vShader, reshapePotentialShader);
    let displayShader = makeShader(gl.FRAGMENT_SHADER, 
                                   viewFrameFragmentSource);
    displayProgram = makeProgram(vShader, displayShader);
    let copyToShader = makeShader(gl.FRAGMENT_SHADER, 
                                  copyOverFragmentSource);
    copyToProgram = makeProgram(vShader, copyToShader);
    let probDensityShader = makeShader(gl.FRAGMENT_SHADER,
                                       probDensityFragmentSource);
    probDensityProgram = makeProgram(vShader, probDensityShader);
    let probCurrentShader = makeShader(gl.FRAGMENT_SHADER,
                                       probCurrentFragmentSource);
    probCurrentProgram = makeProgram(vShader, probCurrentShader);
    let staggeredProbDensityShader = makeShader(gl.FRAGMENT_SHADER,
        staggeredProbDensityFragmentSource);
    staggeredProbDensityProgram = makeProgram(vShader,
        staggeredProbDensityShader);
    let staggeredProbCurrentShader = makeShader(gl.FRAGMENT_SHADER,
        staggeredProbCurrentFragmentSource);
    staggeredProbCurrentProgram = makeProgram(vShader, 
                                              staggeredProbCurrentShader);
    let onesShader = makeShader(gl.FRAGMENT_SHADER, onesFragmentSource);
    onesProgram = makeProgram(vShader, onesShader);
    let imagePotentialShader = makeShader(gl.FRAGMENT_SHADER, 
                                        imagePotentialFragmentSource);
    imagePotentialProgram = makeProgram(vShader, imagePotentialShader);
    let cnShader = makeShader(gl.FRAGMENT_SHADER, 
                              cnExplicitPartFragmentSource); 
    cnExplicitPartProgram = makeProgram(vShader, cnShader);
    let jacobiIterShader = makeShader(gl.FRAGMENT_SHADER, 
                                      jacobiIterationFragmentSource);
    jacobiIterProgram = makeProgram(vShader, jacobiIterShader);
    let expPotentialShader = makeShader(gl.FRAGMENT_SHADER, 
                                        expPotentialFragmentSource);
    expPotentialProgram = makeProgram(vShader, expPotentialShader);
    let complexMultiplyShader = makeShader(gl.FRAGMENT_SHADER,
                                           complexMultiplyFragmentSource);
    complexMultiplyProgram = makeProgram(vShader, 
                                              complexMultiplyShader);
    let fftIterShader = makeShader(gl.FRAGMENT_SHADER, 
                                   fftIterFragmentSource);
    fftIterProgram = makeProgram(vShader, fftIterShader);
    let rearrangeShader = makeShader(gl.FRAGMENT_SHADER, 
                                     rearrangeFragmentSource);
    rearrangeProgram = makeProgram(vShader, rearrangeShader);
    let initVectorPotentialShader = makeShader(gl.FRAGMENT_SHADER,
        initialVectorPotentialFragmentSource);
    initVectorPotentialProgram = makeProgram(vShader, 
                                             initVectorPotentialShader);

    // gl.deleteShader(vShader);
    gl.deleteShader(realTimeStepShader);
    gl.deleteShader(imagTimeStepShader);
    gl.deleteShader(initialWaveShader);
    gl.deleteShader(initPotentialShader);
    gl.deleteShader(reshapePotentialShader);
    gl.deleteShader(displayShader);
    gl.deleteShader(copyToShader);
    gl.deleteShader(probDensityShader);
    gl.deleteShader(probCurrentShader);
    gl.deleteShader(staggeredProbDensityShader);
    gl.deleteShader(staggeredProbCurrentShader);
    gl.deleteShader(onesShader);
    gl.deleteShader(imagePotentialShader);
    gl.deleteShader(jacobiIterShader);
    gl.deleteShader(cnShader);
    gl.deleteShader(expPotentialShader);
    gl.deleteShader(complexMultiplyShader);
    gl.deleteShader(fftIterShader);
    gl.deleteShader(rearrangeShader);
    gl.deleteShader(initVectorPotentialShader);

}


initPrograms();