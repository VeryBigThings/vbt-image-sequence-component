# vbt-image-sequence-component


### How to run repo:

```
npm i
npm run start
```


### How to install the  component
```bash
$ npm install @verybigthings/vbt-image-sequence-component
```

### Check file App.tsx to see an example how to use the component.
Component needs next props as an input:
```typescript
type VBTImageSequenceComponentProps = {
    imagesURLsJSONString: string; // Just JSON stringified Array of images src. Don't forget to require them before.
    app: ImageSequenceApp; // Instance of the viewer, so it's not created once again
    className?: string; // Just if needed.
    idleImageSrc?: string;
    aspectRatio: number;
    // currentIndex: number;

    interval: number; //interval between each of the frames in seconds

    // -- needed for the layers of customization animation --
    reverse: boolean;//, if set to true, the component goes to the last index and then goes in reverse
    reversePauseInterval?: number; // seconds for how long the animation pauses after running the full sequence with reverse?
    //  -- needed for pausing the plug n play animation --
    pause?: boolean; // which pauses the animation

    // -- needed for the cube animation --
    resetIndex?: number; // index on which the sequence will restart from beginning     
    startResetBehaviourIndex?: number; //start value for resetBehaviour counter
    holdBehaviourIndex?: number; // if set to 2 for example, will run 2 whole animations after the reset counter finish
    resetBehaviourIndex?: number; // if set to 3 for example, after the sequence restarts three times at restart index
    // and then number equal to the hold-behaviour-index runs full animations
};
```
You can also destroy (dispose all GPU memory data of single instance) just calling: 
```typescript
const app = new ImageSequenceApp();
app.destroy();
```
To control the size of the viewer, just change CSS style of div, that surrounds `VBTImageSequenceComponent`:
```typescript jsx
<div style={{
    width: "400px",
    height: "400px",
    position: "absolute",
    top: "60px",
    left: "60px",
}}>
    <VBTImageSequenceComponent
        imagesURLsJSONString={JSON.stringify(this.state.imagesURLs)}
        app={this.state.app}
        interval={0.05}
    />
</div>
```