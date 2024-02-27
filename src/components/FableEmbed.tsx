import React, { useEffect } from 'react';
import type {
  IAnnotationConfig,
  NavigateToAnnMessage,
  EventMessageResponse,
  JourneyModuleWithAnns,
  Payload_AnnotationNav,
  Payload_DemoLoadingFinished,
} from './types';

type OnAnnotationChange = (
  currentAnnotationRefId: string,
  journeyIndex: number | null,
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
  style?: React.CSSProperties;
}

const FableEmbed = (props: IProps) => {

  const getDemoUrl = (demoRid: string, params?: { hm: 0 | 1, ha: 0 | 1 }) => {
    const param = params || { hm: 1, ha: 0 };
    const str = JSON.stringify(param);
    const query = encodeURIComponent(btoa(str));
    const url = `http://localhost:3000/p/demo/${demoRid}?c=${query}`;
    return url;
  };

  useEffect(() => {
    function handleMessage(res: NavigateToAnnMessage<EventMessageResponse>) {
      if (
        res.data.type === 'on-navigation' &&
        props.onAnnotationChange
      ) {
        const data = res.data.payload as Payload_AnnotationNav;
        props.onAnnotationChange(
          data.currentAnnotationRefId,
          data.journeyIndex,
          data.demoDisplayName,
          data.demoRid,
          data.demoUrl,
        );
      }
      if (res.data.type === 'demo-loading-finished' && props.onLoaded) {
        const data = res.data.payload as Payload_DemoLoadingFinished;
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
        ...props.style,
      }}
      height="100%"
      className="fable-embed"
      src={getDemoUrl(props.demoRid)}
      allowFullScreen
      id="sharefable"
    />
  );
};

export default FableEmbed;
