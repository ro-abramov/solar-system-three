import {
    EffectComposer,
    RenderPass,
    BloomPass,
    BlurPass,
    KernelSize,
    SMAAPass
} from 'postprocessing';

export default (renderer, scene, camera, light) => {
    let composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);

    const effects = [
        sceneRender(scene, camera),
        smaaEffect(),
        blurEffect(),
        bloomEffect(),
    ];

    effects[effects.length - 1].renderToScreen = true;
    for (let effect of effects) {
        composer.addPass(effect);
    }

    return composer;
}

function sceneRender(scene, camera) {
    const scenePass = new RenderPass(scene, camera);
    scenePass.clear = true;
    return scenePass;
}

function blurEffect() {
    return new BlurPass({
        resolutionScale: 2,
        kernelSize: KernelSize.VERY_SMALL
    });
}

function bloomEffect() {
    return new BloomPass({
        resolutionScale: 0.9,
        kernelSize: KernelSize.LARGE,
        intensity: 2.5,
        distinction: 2,
        screenMode: true
    })
}

function smaaEffect() {
    return new SMAAPass(window.Image);
}