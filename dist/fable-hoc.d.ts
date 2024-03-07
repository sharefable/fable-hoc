import React from 'react';

interface FableIProps {
    demoRid: string;
    layout?: 'sidebyside' | 'stacked';
    origin?: string;
    contentWidthPercentage?: number;
    stopDuration?: number;
    top?: number;
}
declare const Fable: ({ layout, origin, demoRid, contentWidthPercentage, stopDuration, top, ...rest }: FableIProps) => React.JSX.Element;

export { type FableIProps, Fable as default };
