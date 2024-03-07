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

const AnnotationText = (props: AnnotationTextProps) => {
  return (
    <div
      style={{
        boxShadow: props.currAnnRefId === props.ann.refId ? '0 0 0 2px rgba(0, 0, 0)' : '',
        position: props.layout === 'stacked' ? 'sticky' : 'static',
        top: props.layout === 'stacked' ? '175px' : 'auto',
      }}
      className="ann-text"
      key={props.ann.refId}
      data-f-id={props.ann.refId}
      data-f-annidx={props.idx}
      onClick={() => {
        props.handleAnnotationClick(props.idx, props.jIdx);
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          width: '100%',
        }}
      >
        <span className="ann-number">
          {props.idx + 1}
        </span>
        <p style={{ margin: 0 }}>{props.ann.displayText}</p>
      </div>
    </div>
  );
};

export default AnnotationText;
