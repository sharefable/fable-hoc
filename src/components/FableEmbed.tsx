import React, { useEffect } from 'react';
import type {
  IAnnotationConfig,
  NavigateToAnnMessage,
  EventMessageResponse,
  JourneyModuleWithAnns,
} from './types';

type OnAnnotationChange = (
  currentAnnoationIndex: number,
  annotationConfig: IAnnotationConfig,
  journeyIndex: number | null,
  journeyName: string | null,
  totalNumberOfAnnotationsInCurrentTimeline: number,
  demoDisplayName: string,
  demoRid: string,
  demoUrl: string,
) => void;

type OnLoaded = (
  annConfigs: IAnnotationConfig[],
  demoUrl: string,
  demoDisplayName: string,
  demoRid: string,
  journeyData: JourneyModuleWithAnns[] | null
) => void;

interface IProps {
  demoRid: string;
  innerRef?: React.Ref<HTMLIFrameElement>;
  onLoaded?: OnLoaded;
  onAnnotationChange?: OnAnnotationChange;
}

const FableEmbed = (props: IProps) => {
  useEffect(() => {
    function handleMessage(res: NavigateToAnnMessage<EventMessageResponse>) {
      const data = res.data.payload;
      if (
        res.data.type === 'on-annotation-navigation' &&
        props.onAnnotationChange
      ) {
        props.onAnnotationChange(
          data.currentAnnoationIndex,
          data.annotationConfig,
          data.journeyIndex,
          data.journeyName,
          data.totalNumberOfAnnotationsInCurrentTimeline,
          data.demoDisplayName,
          data.demoRid,
          data.demoUrl,
        );
      }
      if (res.data?.type === 'demo-loading-finished' && props.onLoaded) {
        props.onLoaded(
          data.annConfigs,
          data.demoUrl,
          data.demoDisplayName,
          data.demoRid,
          data.journeyData
        );
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [props.onLoaded, props.onAnnotationChange]);

  return (
    <iframe
      ref={props.innerRef}
      style={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '100%',
        marginTop: '1rem',
      }}
      className="fable-embed"
      src={`http://localhost:3000/p/demo/${props.demoRid}`}
      allowFullScreen
      id="sharefable"
    />
  );
};

export default FableEmbed;
