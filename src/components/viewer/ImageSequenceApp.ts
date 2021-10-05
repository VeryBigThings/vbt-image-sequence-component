import {PlaneMaterialRenderer} from './PlaneMaterialRenderer';
import {MeshBasicMaterial, Texture, TextureLoader} from 'three';

export class ImageSequenceApp extends PlaneMaterialRenderer {
    textures: Texture[] = [];
    loadedQuantity: number = 0;
    loadedImages: boolean = false;
    onLoaded: () => void;
    private material: MeshBasicMaterial;
    private currentIndex: number = 0;
    private imagesURLsJSONString: string;
    private interval: number = -1;
    private reverse: boolean = false;
    private pause: boolean = false;
    private incrementor: number = 1;// 1  or  -1
    private lastTime: number = 0;
    private resetIndex: number;
    private holdBehaviourIndex: number;
    private holdBehaviourIndexValue: number = 0;
    private resetBehaviourIndex: number;
    private resetBehaviourIndexValue: number = 0;
    private startResetBehaviourIndex: number;
    private reversePauseInterval: number = 0;

    constructor() {
        super();
        this.material = new MeshBasicMaterial({transparent: true, opacity: 1});

        this.init(this.material);
    }

    textureLoaded(index: number, totalQuantity: number) {
        if (++this.loadedQuantity >= totalQuantity) {
            this.loadedImages = true;
            if (this.onLoaded) {
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
            if (Math.abs(index - i) > 10) {
                el.dispose();
            }
        })
    }

    update(time: number, width: number, height: number) {
        super.update(time, width, height);
        if (!this.pause && time - this.lastTime > this.interval) {
            let newIndex = this.currentIndex + this.incrementor;
            if (newIndex >= this.textures.length ||
                (this.resetIndex && newIndex >= this.resetIndex && this.resetBehaviourIndexValue < this.resetBehaviourIndex)) {
                if (this.reverse) {
                    newIndex--;
                    this.incrementor *= -1;
                } else {
                    if (this.resetBehaviourIndex) {
                        if (this.holdBehaviourIndexValue >= this.holdBehaviourIndex) {
                            this.holdBehaviourIndexValue = 0;
                            this.resetBehaviourIndexValue = 0;
                        }
                        if (this.resetBehaviourIndexValue >= this.resetBehaviourIndex) {
                            this.holdBehaviourIndexValue++;
                        }
                        this.resetBehaviourIndexValue++;

                    }
                    newIndex = 0;
                }
            }

            if (newIndex < 0) {
                newIndex = 0;
                this.incrementor = 1;
                this.pause = true;
                setTimeout(() => {
                    this.pause = false;
                }, this.reversePauseInterval * 1000);
            }
            this.setIndex(newIndex)
            this.lastTime = time;
        }
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
        if (this.imagesURLsJSONString === imagesURLsJSONString) {
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
        imagesURLs.forEach((url, index) => {
            const texture = new TextureLoader().load(url, () => {
                if (this.imagesURLsJSONString !== imagesURLsJSONString) {
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

    setInterval(interval: number) {
        this.interval = interval;
    }

    setReverse(reverse: boolean) {
        this.reverse = reverse;
    }

    setPause(pause: boolean) {
        this.pause = pause;
    }

    setResetIndex(resetIndex: number) {
        this.resetIndex = resetIndex;
    }

    setHoldBehaviourIndex(holdBehaviourIndex: number) {
        this.holdBehaviourIndex = holdBehaviourIndex;
    }

    setResetBehaviourIndex(resetBehaviourIndex: number) {
        this.resetBehaviourIndex = resetBehaviourIndex;
    }

    setStartResetBehaviourIndex(startResetBehaviourIndex: number) {
        this.resetBehaviourIndexValue = startResetBehaviourIndex;
    }

    setReversePauseInterval(reversePauseInterval: number) {
        this.reversePauseInterval = reversePauseInterval;
    }
}