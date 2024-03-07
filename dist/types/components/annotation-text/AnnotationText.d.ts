import React from 'react';
import './style.css';
import { IAnnotationConfig } from '../types';
interface AnnotationTextProps {
    ann: IAnnotationConfig;
    idx: number;
    jIdx?: number;
    handleAnnotationClick: (idx: number, jIdx?: number) => void;
    currAnnRefId: string;
    layout: 'sidebyside' | 'stacked';
}
declare const AnnotationText: (props: AnnotationTextProps) => React.JSX.Element;
export default AnnotationText;
