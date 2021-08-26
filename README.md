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
    currentIndex: number; // Current index of frame 0..N, where N is the number of last frame
    imagesURLsJSONString: string; // Just JSON stringified Array of images src. Don't forget to require them before.
    app: ImageSequenceApp; // Instance of the viewer, so it's not created once again
    className?: string; // Just if needed.
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
        currentIndex={this.state.currentIndex}
        app={this.state.app}
    />
</div>
```