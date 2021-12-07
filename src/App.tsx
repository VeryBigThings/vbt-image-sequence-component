import React from 'react';
import './App.css';
import {ImageSequenceApp as InternalApp, VBTImageSequenceComponent} from './components/index';

type MyProps = {
    // using `interface` is also ok
    // message: string;
};
type MyState = {
    imagesURLs: Array<string>;
    app?: any;
    idleImageSrc?: string;
    pause: boolean;
};
function initAppWithDefaultResources() {
    return new InternalApp();
}

export default class App extends React.Component<MyProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        pause: false,
        imagesURLs: [
        ],
        app: initAppWithDefaultResources()
    };

    constructor(props: any) {
        super(props);

        // const [currentIndex, setCurrentIndex] = useState(this.state.currentIndex);
    }

    render() {
        return (
            <div className="App" id="controlsContainer">
                <button onClick={() => {
                    this.setState({pause: !this.state.pause})
                }}>Pause</button>
                <div style={{
                    width: "400px",
                    height: "400px",
                    position: "absolute",
                    top: "60px",
                    left: "60px",
                }}>
                    <VBTImageSequenceComponent
                        imagesURLsJSONString={JSON.stringify(this.state.imagesURLs) }
                        app={this.state.app}
                        idleImageSrc={this.state.idleImageSrc}
                        interval={0.03}
                        reverse={true}
                        reversePauseInterval={1}
                        pause={this.state.pause}
                        aspectRatio={0}

                    />

                </div>

            </div>
        );
    }
}
