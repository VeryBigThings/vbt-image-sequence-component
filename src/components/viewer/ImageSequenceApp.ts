import {PlaneMaterialRenderer} from './PlaneMaterialRenderer';
import {MeshBasicMaterial, Texture, TextureLoader} from 'three';

export class ImageSequenceApp extends PlaneMaterialRenderer {
    textures: Texture[] = [];
    loadedQuantity: number = 0;
    loadedImages: boolean = false;
    private material: MeshBasicMaterial;
    private currentIndex: number = 0;

    constructor() {
        super();
        this.material = new MeshBasicMaterial({transparent: true, opacity: 1});

        this.init(this.material);
    }

    textureLoaded(index: number, totalQuantity: number) {
        if (++this.loadedQuantity >= totalQuantity) {
            this.loadedImages = true;
            console.log('Images are loaded..');
            this.setIndex(this.currentIndex);
        }
    }

    setIndex(index: number) {
        this.currentIndex = index;
        this.material.map = this.textures[index];
        this.material.needsUpdate = true;

        this.textures.forEach((el, i) => {
            if (Math.abs(index - i) > 3) el.dispose();
        })
    }

    update(time: number, width: number, height: number) {
        super.update(time, width, height);
    }

    destroy() {
        this.renderer.dispose();
        this.material.dispose();
        this.textures.forEach((el, i) => {
            el.dispose();
        })
    }

    getDOMElement() {
        return this.canvas;
    }

    setImagesURLs(imagesURLs: Array<string>) {

        this.textures.forEach((el, i) => {
            el.dispose();
        });
        this.textures = [];
        this.loadedQuantity = 0;
        this.loadedImages = false;
        console.log(imagesURLs);
        imagesURLs.forEach((url, index) => {
            const texture = new TextureLoader().load(url, () => this.textureLoaded(index, imagesURLs.length));
            // Just for future needs..
            // texture.anisotropy = 0;
            // texture.magFilter = NearestFilter;
            // texture.minFilter = NearestFilter;
            this.textures.push(
                texture
            );
        })
    }
}