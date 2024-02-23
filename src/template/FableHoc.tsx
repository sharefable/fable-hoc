import React, { useCallback, useState, useRef, useEffect } from 'react';
import FableEmbed from '../components/FableEmbed';
import { navAnn } from '../components/utils';
import { IAnnotationConfig, JourneyModuleWithAnns } from '../components/types';

interface IProps {
  layout?: 'row' | 'col';
}

const FableHoc = ({ layout = 'col', ...rest }: IProps) => {
  const [currAnnRefId, setCurrAnnRefId] = useState<string>('');
  const [isAnnLoaded, setIsAnnLoaded] = useState(false);
  const [journeyData, setJourneyData] = useState<JourneyModuleWithAnns[] | null>(null);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const fableRef = useRef<HTMLIFrameElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [disableMouse, setMouseDisable] = useState(false);

  const onLoaded = useCallback((
    annConfigs: IAnnotationConfig[],
    demoUrl: string,
    demoDisplayName: string,
    demoRid: string,
    journeyData: JourneyModuleWithAnns[] | null
  ) => {
    setIsAnnLoaded(true);
    setJourneyData(journeyData);
    if (!journeyData?.length) return;
    setCurrAnnRefId(journeyData[0].annsInOrder[0].refId);
  }, []);

  const onChange = useCallback((
    index: number,
    annotationConfig: IAnnotationConfig,
    journeyIndex: number | null,
  ) => {
    setJourneyIndex(journeyIndex || 0);
    if (journeyData?.length) {
      setCurrAnnRefId(annotationConfig.refId);
    }
  }, [journeyData]);

  useEffect(() => {
    if (!isAnnLoaded) return;
    const target = textContainerRef.current?.querySelector(`[data-f-id="${currAnnRefId}"]`) as HTMLElement;
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currAnnRefId, journeyIndex]);

  return (
    <div
      style={{
        width: '100%',
        height: '50rem',
        background: '#FFF7F1',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1440px',
      }}
      {...rest}
    >
      <div
        className=""
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          overflow: 'auto',
          padding: '1rem',
          flex: '0 0 auto',
        }}
      >
        {journeyData?.map((item) => (
          <div key={`journey-${item.main}`}>
            <div>
              <h1>{item.header1}</h1>
              <p>{item.header2}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        className=""
        style={{
          display: 'flex',
          flexDirection: layout === 'row' ? 'row-reverse' : 'column',
          width: '100%',
          overflow: 'hidden',
          flex: '1'
        }}>
        <div
          style={{
            width: '100%',
            height: layout === 'col' ? '25rem' : 'calc(100% - 4rem)',
            flex: layout === 'col' ? '0 0 auto' : '1'
          }}
        >
          <FableEmbed
            demoRid="test-get2pic0iiosnvbo"
            onLoaded={onLoaded}
            innerRef={fableRef}
            onAnnotationChange={onChange}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >{isAnnLoaded &&
            (
              <>
                <span
                  style={{
                    background: 'rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    padding: '1rem',
                  }}
                  onClick={() => navAnn('prev', fableRef)}
                >
                  Prev
                </span>
                <span
                  style={{
                    background: 'rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    padding: '1rem',
                  }}
                  onClick={() => navAnn('next', fableRef)}
                >
                  Next
                </span>
              </>
            )}
          </div>
        </div>
        <div
          ref={textContainerRef}
          style={{
            marginTop: layout === 'col' ? '4rem' : '2rem',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: '100%',
            width: '100%',
            maxWidth: layout === 'col' ? '40rem' : '20rem',
            scrollbarWidth: 'thin',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {journeyData?.map((journey, jIdx) => {
            return (
              <div
                key={journey.main}
                style={{
                  padding: '0.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  borderBottom: '1px solid #bbb',
                }}
              >
                {journey.annsInOrder.map((ann, idx) => {
                  return (
                    <div
                      style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        boxShadow: currAnnRefId === ann.refId ? '0 0 0 2px rgba(0, 0, 0)' : '',
                        cursor: disableMouse ? 'progress' : 'pointer',
                        transition: 'box-shadow 0.8s ease',

                      }}
                      key={ann.refId}
                      data-f-id={ann.refId}
                      data-f-annidx={idx}
                      onClick={() => {
                        if (disableMouse) return;
                        const clickedJourneyIdx = jIdx;
                        const clickedAnnIdx = idx;
                        const currJourneyIdx = journeyIndex;
                        const currAnnIdx = journeyData[currJourneyIdx].annsInOrder.findIndex((ann) => ann.refId === currAnnRefId);
                        let diff: number = 0;

                        if (currJourneyIdx !== clickedJourneyIdx) {
                          if (clickedJourneyIdx - currJourneyIdx >= 1) {
                            diff = journeyData[currJourneyIdx].annsInOrder.length - currAnnIdx + clickedAnnIdx;
                            for (let i = currJourneyIdx + 1; i < clickedJourneyIdx; i++) {
                              diff += journeyData[i].annsInOrder.length;
                            }
                          } else {
                            diff = clickedAnnIdx - journeyData[clickedJourneyIdx].annsInOrder.length - currAnnIdx;
                            for (let i = currJourneyIdx - 1; i > clickedJourneyIdx; i--) {
                              diff -= journeyData[i].annsInOrder.length;
                            }
                          }
                        } else {
                          diff = clickedAnnIdx - currAnnIdx;
                        }

                        if (diff <= 0) return;
                        setMouseDisable(true);
                        let i = 1;
                        const interval = setInterval(() => {
                          if (i === diff) {
                            setMouseDisable(false);
                            clearInterval(interval);
                          }
                          navAnn('next', fableRef);
                          i++;
                        }, 2000);
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.4rem',
                          width: '100%',
                        }}
                      >
                        <span
                          style={{
                            borderRadius: '1rem',
                            background: '#E78895',
                            aspectRatio: '1/1',
                            width: '2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            height: 'fit-content',
                            padding: '0.4rem',
                            minWidth: 'fit-content',
                            minHeight: 'fit-content',
                          }}
                        >
                          {idx + 1}
                        </span>
                        <p>{ann.displayText}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FableHoc;
