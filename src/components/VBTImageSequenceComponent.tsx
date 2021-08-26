import React, {useEffect, useRef} from 'react';
import {ImageSequenceApp} from './viewer/ImageSequenceApp';

export type VBTImageSequenceComponentState = {};
export type VBTImageSequenceComponentProps = {
    currentIndex: number;
    imagesURLs: Array<string>;
    app: ImageSequenceApp;
    className?: string;
};

export function VBTImageSequenceComponent(props: VBTImageSequenceComponentProps) {
    const targetElRef = useRef<HTMLDivElement>();

    // This effect has no dependencies because we want it to run only
    // once. Maybe we should re-run it whenever any of deps changes,
    // but I'm not sure what effect it could have on the state of the
    // inner App
    useEffect(() => {
        const targetEl = targetElRef.current;
        // props.app.setImagesURLs(props.imagesURLs);
        if (targetEl && props.app) {
            // @ts-ignore
            targetEl.appendChild(props.app.getDOMElement());
        }
        return () => {
            if (targetEl && props.app) {
                while (targetEl.firstChild) {
                    targetEl.removeChild(targetEl.lastChild);
                }
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
            if(props.app) {
                targetEl.appendChild(props.app.getDOMElement());
            }
        }
    }, [props.app]);

    useEffect(() => {
        if(props.app) props.app.setImagesURLs(props.imagesURLs);
    }, [props.app, props.imagesURLs]);

    useEffect(() => {
        if(props.app) props.app.setIndex(props.currentIndex);
    }, [props.app, props.currentIndex]);


    // We use padding-top to keep the div responsive. Please check the ratio, I've come
    // to 12 / 16 by experimenting, but maybe some other ratio could work better
    return (
        <div
            style={{paddingTop: 'calc(12 / 16  * 100%)', position: 'relative'}}
            className={props.className}
        >
            <div
                ref={targetElRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                }}
            />
        </div>
    );
}
