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
            require('./assets/images/test_sequence/Image_0.png'),
            require('./assets/images/test_sequence/Image_1.png'),
            require('./assets/images/test_sequence/Image_2.png'),
            require('./assets/images/test_sequence/Image_3.png'),
            require('./assets/images/test_sequence/Image_4.png'),
            require('./assets/images/test_sequence/Image_5.png'),
            require('./assets/images/test_sequence/Image_6.png'),
            require('./assets/images/test_sequence/Image_7.png'),
            require('./assets/images/test_sequence/Image_8.png'),
            require('./assets/images/test_sequence/Image_9.png'),
            require('./assets/images/test_sequence/Image_10.png'),
            require('./assets/images/test_sequence/Image_11.png'),
            require('./assets/images/test_sequence/Image_12.png'),
            require('./assets/images/test_sequence/Image_13.png'),
            require('./assets/images/test_sequence/Image_14.png'),
            require('./assets/images/test_sequence/Image_15.png'),
            require('./assets/images/test_sequence/Image_16.png'),
            require('./assets/images/test_sequence/Image_17.png'),
            require('./assets/images/test_sequence/Image_18.png'),
            require('./assets/images/test_sequence/Image_19.png'),
            require('./assets/images/test_sequence/Image_20.png'),
            require('./assets/images/test_sequence/Image_21.png'),
            require('./assets/images/test_sequence/Image_22.png'),
            require('./assets/images/test_sequence/Image_23.png'),
            require('./assets/images/test_sequence/Image_24.png'),
            require('./assets/images/test_sequence/Image_25.png'),
            require('./assets/images/test_sequence/Image_26.png'),
            require('./assets/images/test_sequence/Image_27.png'),
            require('./assets/images/test_sequence/Image_28.png'),
            require('./assets/images/test_sequence/Image_29.png'),
            require('./assets/images/test_sequence/Image_30.png'),
            require('./assets/images/test_sequence/Image_31.png'),
            require('./assets/images/test_sequence/Image_32.png'),
            require('./assets/images/test_sequence/Image_33.png'),
            require('./assets/images/test_sequence/Image_34.png'),
        ],
        app: initAppWithDefaultResources(),
        idleImageSrc: require('./assets/images/test_sequence/Image_0.png')
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
                        interval={0.05}
                        reverse={true}
                        pause={this.state.pause}
                        aspectRatio={0}

                    />

                </div>

            </div>
        );
    }
}
