import React from 'react';
import { IAnnotationConfig, JourneyModuleWithAnns } from './types';
type OnAnnotationChange = (currentAnnotationRefId: string, journeyIndex: number | null) => void;
type OnLoaded = (annConfigs: IAnnotationConfig[], journeyData: JourneyModuleWithAnns[] | null) => void;
interface IProps {
    demoRid: string;
    innerRef?: React.Ref<HTMLIFrameElement>;
    onLoaded?: OnLoaded;
    onAnnotationChange?: OnAnnotationChange;
    style?: React.CSSProperties;
    origin?: string;
}
declare const FableEmbed: (props: IProps) => React.JSX.Element;
export default FableEmbed;
