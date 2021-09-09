import {PlaneMaterialRenderer} from './PlaneMaterialRenderer';
import {MeshBasicMaterial, Texture, TextureLoader} from 'three';

export class ImageSequenceApp extends PlaneMaterialRenderer {
    textures: Texture[] = [];
    loadedQuantity: number = 0;
    loadedImages: boolean = false;
    onLoaded: ()=>void;
    private material: MeshBasicMaterial;
    private currentIndex: number = 0;
    private imagesURLsJSONString: string;

    constructor() {
        super();
        this.material = new MeshBasicMaterial({transparent: true, opacity: 1});

        this.init(this.material);
    }

    textureLoaded(index: number, totalQuantity: number) {
        if (++this.loadedQuantity >= totalQuantity) {
            console.log(this.loadedQuantity, totalQuantity);
            this.loadedImages = true;
            if(this.onLoaded) {
                this.onLoaded();
            }
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

    setImagesURLs(imagesURLsJSONString: string) {
        if(this.imagesURLsJSONString === imagesURLsJSONString) {
            return false;
        }
        this.imagesURLsJSONString = imagesURLsJSONString;
        const imagesURLs: Array<string> = JSON.parse(imagesURLsJSONString);
        this.textures.forEach((el, i) => {
            el.dispose();
        });
        this.textures = [];
        this.loadedQuantity = 0;
        this.loadedImages = false;
        // console.log(imagesURLs);
        imagesURLs.forEach((url, index) => {
            const texture = new TextureLoader().load(url, () => {
                if(this.imagesURLsJSONString !== imagesURLsJSONString) {
                    texture.dispose();
                    return;
                }
                this.textureLoaded(index, imagesURLs.length)
            });
            // Just for future needs..
            // texture.anisotropy = 0;
            // texture.magFilter = NearestFilter;
            // texture.minFilter = NearestFilter;
            this.textures.push(
                texture
            );
        });
        return true;
    }
}