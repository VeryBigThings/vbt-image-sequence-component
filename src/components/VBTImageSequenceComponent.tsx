import React, {useEffect, useRef, useState} from 'react';
import {ImageSequenceApp} from './viewer/ImageSequenceApp';

export type VBTImageSequenceComponentState = {};
export type VBTImageSequenceComponentProps = {
    currentIndex: number;
    imagesURLsJSONString: string;
    app: ImageSequenceApp;
    className?: string;
    idleImageSrc?: string;
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
            console.log('props.app.onLoaded = () => setLoadedImages(true);');
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
            props.app.onLoaded = null;
            if(props.app) {
                targetEl.appendChild(props.app.getDOMElement());
            }
        }
        if(props.app) {
            console.log('props.app.onLoaded = () => {');
            props.app.onLoaded = () => {
                setLoadedImages(true);
                targetEl.appendChild(props.app.getDOMElement());
                console.log('loaded useEffect callback');
            }
            props.app.setImagesURLs(props.imagesURLsJSONString);
            props.app.setIndex(props.currentIndex);
        }
    }, [props.app]);

    // todo: change array to JSON string
    useEffect(() => {
        if(props.app) props.app.setImagesURLs(props.imagesURLsJSONString);
    }, [props.imagesURLsJSONString]);

    useEffect(() => {
        if(props.app) props.app.setIndex(props.currentIndex);
    }, [props.currentIndex]);


    // We use padding-top to keep the div responsive. Please check the ratio, I've come
    // to 12 / 16 by experimenting, but maybe some other ratio could work better
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: '0'
            }}
            className={props.className}
        >
                <img
                    alt={'Sequence component idle'}
                    src={props.idleImageSrc}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        display: loadedImages ? 'none':'block'


                    }}
                />
            <div
                ref={targetElRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    display: loadedImages ? 'block' : 'none'
                }}
            />

        </div>
    );
}
