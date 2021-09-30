import React, {useEffect, useRef, useState} from 'react';
import {ImageSequenceApp} from './viewer/ImageSequenceApp';

export type VBTImageSequenceComponentState = {};
export type VBTImageSequenceComponentProps = {
    imagesURLsJSONString: string;
    app: ImageSequenceApp;
    idleImageSrc?: string;
    className?: string;
    aspectRatio: number;
    // currentIndex: number;

    interval: number; //interval between each of the frames in seconds

    // -- needed for the layers of customization animation --
    reverse: boolean;//, if set to true, the component goes to the last index and then goes in reverse

    //  -- needed for pausing the plug n play animation --
    pause?: boolean; // which pauses the animation

    // -- needed for the cube animation --
    resetIndex?: number; // index on which the sequence will restart from beginning
    holdBehaviourIndex?: number; // if set to 2 for example, will run 2 whole animations after the reset counter finish
    resetBehaviourIndex?: number; // if set to 3 for example, after the sequence restarts three times at restart index
    // and then number equal to the hold-behaviour-index runs full animations
    startResetBehaviourIndex?: number; // starting value of the reset-behaviour
};

export function VBTImageSequenceComponent(props: VBTImageSequenceComponentProps) {
    const targetElRef = useRef<HTMLDivElement>();

    let [loadedImages, setLoadedImages] = useState(false);

    // This effect has no dependencies because we want it to run only
    // once. Maybe we should re-run it whenever any of deps changes,
    // but I'm not sure what effect it could have on the state of the
    // inner App
    useEffect(() => {
        const targetEl = targetElRef.current;
        // props.app.setImagesURLs(props.imagesURLs);
        if (props.app) {
            if(targetEl){
                // @ts-ignore
                targetEl.appendChild(props.app.getDOMElement());
            }
            props.app.onLoaded = () => {
                setLoadedImages(true);
                if(targetEl) {
                    // @ts-ignore
                    targetEl.appendChild(props.app.getDOMElement());
                }
            }
        }
        return () => {
            if (targetEl && props.app) {
                while (targetEl.firstChild) {
                    targetEl.removeChild(targetEl.lastChild);
                }
                props.app.onLoaded = null;
                setLoadedImages(false);
            }
        };
    }, []); // eslint-disable-line

    // useEffect(() => {
    //   const { width, height } = targetElRef.current.getBoundingClientRect();
    //   props.app.updateRendererSize(width, height);
    // }, [props.app, windowSize]);


    useEffect(() => {
        const targetEl = targetElRef.current;
        if (targetEl) {
            while (targetEl.firstChild) {
                targetEl.removeChild(targetEl.lastChild);
            }
            setLoadedImages(false);
            if(props.app) {
                props.app.onLoaded = null;
                targetEl.appendChild(props.app.getDOMElement());
            }
        }
        if(props.app) {
            props.app.onLoaded = () => {
                setLoadedImages(true);
                targetEl.appendChild(props.app.getDOMElement());
            }
            props.app.setImagesURLs(props.imagesURLsJSONString);
            // props.app.setIndex(props.currentIndex);
        }
    }, [props.app]);

    // todo: change array to JSON string
    useEffect(() => {
        if(props.app) {
            const updated = props.app.setImagesURLs(props.imagesURLsJSONString);
            if(updated) {
                setLoadedImages(false);
                props.app.onLoaded = () => {
                    setLoadedImages(true);
                }
            }
        }
    }, [props.imagesURLsJSONString]);

    // useEffect(() => {
    //     if(props.app) props.app.setIndex(props.currentIndex);
    // }, [props.currentIndex]);

    useEffect(() => {
        if(props.app) props.app.aspectRatio = props.aspectRatio;
    }, [props.aspectRatio]);


    useEffect(() => {
        if(props.app) props.app.setInterval(props.interval);
    }, [props.interval]);
    useEffect(() => {
        if(props.app) props.app.setReverse(props.reverse);
    }, [props.reverse]);
    useEffect(() => {
        if(props.app) props.app.setPause(props.pause);
    }, [props.pause]);

    // We use padding-top to keep the div responsive. Please check the ratio, I've come
    // to 12 / 16 by experimenting, but maybe some other ratio could work better
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
            className={props.className}
        >
                <img
                    alt={'Sequence component idle'}
                    src={props.idleImageSrc}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: loadedImages ? 'none':'block'
                    }}
                />
            <div
                ref={targetElRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: loadedImages ? 'block' : 'none'
                }}
            />

        </div>
    );
}
