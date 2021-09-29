import {Material, Mesh, OrthographicCamera, PlaneGeometry, Scene, WebGLRenderer} from 'three';

const makeId = (function () {
    let id = 0;
    return function () {
        id++;
        return id;
    };
})();

export class PlaneMaterialRenderer {

    public canvas: HTMLCanvasElement;
    public renderer: WebGLRenderer;
    /**
     * If the aspect ratio is 0, canvas is fully filled the parent.
     * If not, fills with the largest side.
     * aspectRatio = height / width;
     */
    public aspectRatio: number = 0;

    init(material: Material) {
        this.canvas = (document.createElement('canvas') as HTMLCanvasElement);
        this.canvas.id = `webglApp_${makeId()}`;
        this.canvas.style.height = 'auto';
        this.canvas.style.width = '100%';
        this.renderer = new WebGLRenderer({canvas: this.canvas, alpha: true});
        this.renderer.autoClearColor = true;
        this.renderer.setPixelRatio(devicePixelRatio);
        // this.renderer.setClearAlpha(0);
        this.renderer.setClearColor(0x000000, 0);

        const camera = new OrthographicCamera(
            -1, // left
            1, // right
            1, // top
            -1, // bottom
            -1, // near,
            1, // far
        );
        const scene = new Scene();
        const plane = new PlaneGeometry(2, 2);

        scene.add(new Mesh(plane, material));

        const resizeRendererToDisplaySize = (renderer: WebGLRenderer) => {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = this.aspectRatio === 0 ? canvas.clientHeight : canvas.clientWidth * this.aspectRatio;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        const isCanvasInViewport = (el: HTMLCanvasElement) => {

            const { top, bottom } = el.getBoundingClientRect();
            const vHeight = (window.innerHeight || document.documentElement.clientHeight);

            return (
                (top > 0 || bottom > 0) &&
                top < vHeight
            );
        }

        const render = (time: number) => {
            time *= 0.001;
            const canvas = this.renderer.domElement;
            if(isCanvasInViewport(canvas)) {
                resizeRendererToDisplaySize(this.renderer);

                this.update(time, canvas.width, canvas.height);

                this.renderer.render(scene, camera);
            }
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }

    update(time: number, width: number, height: number) {

    }
}