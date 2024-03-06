import React from 'react';
import './style.css';
export interface FableIProps {
    demoRid: string;
    layout?: 'sidebyside' | 'stacked';
    origin?: string;
    contentWidthPercentage?: number;
    stopDuration?: number;
}
declare const Fable: ({ layout, origin, demoRid, contentWidthPercentage, stopDuration, ...rest }: FableIProps) => React.JSX.Element;
export default Fable;
