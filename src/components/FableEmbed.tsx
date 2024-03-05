import React, { useEffect } from 'react';
import {
  IAnnotationConfig,
  NavigateToAnnMessage,
  EventMessageResponse,
  JourneyModuleWithAnns,
  Payload_AnnotationNav,
  Payload_DemoLoadingFinished,
  ExtMsg
} from './types';

type OnAnnotationChange = (
  currentAnnotationRefId: string,
  journeyIndex: number | null,
) => void;

type OnLoaded = (
  annConfigs: IAnnotationConfig[],
  journeyData: JourneyModuleWithAnns[] | null
) => void;

interface IProps {
  demoRid: string;
  innerRef?: React.Ref<HTMLIFrameElement>;
  onLoaded?: OnLoaded;
  onAnnotationChange?: OnAnnotationChange;
  style?: React.CSSProperties;
  origin?: string;
}

const FableEmbed = (props: IProps) => {

  const getDemoUrl = (demoRid: string, params?: { hm: 0 | 1, ha: 0 | 1 }) => {
    const origin = props.origin || 'https://app.sharefable.com';
    const param = params || { hm: 1, ha: 1 };
    const str = JSON.stringify(param);
    const query = encodeURIComponent(btoa(str));
    const url = new URL(`p/demo/${demoRid}?c=${query}`, origin);
    return url.href;
  };

  useEffect(() => {
    function handleMessage(res: NavigateToAnnMessage<EventMessageResponse>) {
      if (
        res.data.type === ExtMsg.OnNavigation &&
        props.onAnnotationChange
      ) {
        const data = res.data.payload as Payload_AnnotationNav;
        props.onAnnotationChange(
          data.currentAnnotationRefId,
          data.journeyIndex
        );
      }
      if (res.data.type === ExtMsg.DemoLoadingFinished && props.onLoaded) {
        const data = res.data.payload as Payload_DemoLoadingFinished;
        props.onLoaded(
          data.annConfigs,
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
