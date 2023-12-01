import React, { useEffect } from "react"
import type { IAnnotationConfig } from "./types";

type OnAnnotationChange = (
  currentAnnoationIndex: number,
  totalNumberOfAnnotationsInCurrentTimeline: number,
  journeyName: string | null,
  annotationConfig: IAnnotationConfig,
  demoDisplayName: string,
  demoRid: string,
  demoUrl: string
) => void;

type OnLoaded = (
  annConfigs: IAnnotationConfig[],
  demoUrl: string,
  demoDisplayName: string,
  demoRid: string
) => void;

interface IProps {
  demoRid: string
  innerRef?: React.Ref<HTMLIFrameElement>
  onLoaded?: OnLoaded
  onAnnotationChange?: OnAnnotationChange
}

const FableEmbed = (props: IProps) => {

  useEffect(() => {
    function handleMessage(res: any) {
      const data = res.data.payload;
      if (res.data.type === 'on-annotation-navigation' && props.onAnnotationChange) {
        props.onAnnotationChange(
          data.currentAnnoationIndex,
          data.totalNumberOfAnnotationsInCurrentTimeline,
          data.journeyName,
          data.annotationConfig,
          data.demoDisplayName,
          data.demoRid,
          data.demoUrl
        )
      }
      if (res.data?.type === 'demo-loading-finished' && props.onLoaded) {
        props.onLoaded(data.annConfigs, data.demoUrl, data.demoDisplayName, data.demoRid)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [props])

  return (
    <iframe
      ref={props.innerRef}
      style={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '100%',
        marginTop: '1rem'
      }}
      className="fable-embed"
      src={`https://app.staging.sharefable.com/p/demo/${props.demoRid}`}
      allowFullScreen
      id="sharefable"
    />
  )
}

export default FableEmbed
