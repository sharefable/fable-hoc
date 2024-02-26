import React, { useCallback, useState, useRef, useEffect } from 'react';
import FableEmbed from '../components/FableEmbed';
import { navAnn, goToFirstAnnOfModule } from '../components/utils';
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
    jrnyData: JourneyModuleWithAnns[] | null,

  ) => {
    setIsAnnLoaded(true);
    setJourneyData(jrnyData);
    if (!jrnyData?.length) return;
    setCurrAnnRefId(jrnyData[0].annsInOrder[0].refId);
  }, []);

  const onChange = useCallback((
    currentAnnotationRefId: string,
    jrnyIdx: number | null,
  ) => {
    setCurrAnnRefId(currentAnnotationRefId);
    setJourneyIndex(jrnyIdx || 0);
  }, []);

  useEffect(() => {
    if (!isAnnLoaded) return;
    const target = textContainerRef.current?.querySelector(`[data-f-id="${currAnnRefId}"]`) as HTMLElement;
    const center = target.offsetTop - window.innerHeight / 2;
    window.scrollTo({
      top: center,
      behavior: 'smooth',
    });
  }, [currAnnRefId, journeyIndex]);

  return (
    <div
      style={{
        width: '100%',
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
          flex: '1',
        }}>
        <div
          style={{
            minHeight: '50rem',
            width: '100%',
            height: layout === 'col' ? '25rem' : 'calc(100% - 4rem)',
            flex: layout === 'col' ? '0 0 auto' : '1',
            position: 'sticky',
            top: '1rem',
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
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            maxWidth: layout === 'col' ? '40rem' : '20rem',
            scrollbarWidth: 'thin',
            marginLeft: 'auto',
            marginRight: 'auto',
            cursor: disableMouse ? 'progress' : 'pointer',
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
                        const wait = 1500;
                        let diff: number = 0;

                        if (currJourneyIdx !== clickedJourneyIdx) {
                          const startIdx = Math.min(currJourneyIdx, clickedJourneyIdx);
                          const endIdx = Math.max(currJourneyIdx, clickedJourneyIdx);

                          for (let i = startIdx + 1; i < endIdx; i++) {
                            diff += journeyData[i].annsInOrder.length;
                          }

                          if (clickedJourneyIdx - currJourneyIdx >= 1) {
                            diff += journeyData[currJourneyIdx].annsInOrder.length - currAnnIdx + clickedAnnIdx;
                          } else {
                            diff += clickedAnnIdx - journeyData[clickedJourneyIdx].annsInOrder.length - currAnnIdx;
                          }
                        } else {
                          diff = clickedAnnIdx - currAnnIdx;
                        }
                        if (diff === 0) {
                          setMouseDisable(false);
                          return;
                        }

                        setMouseDisable(true);
                        if (clickedJourneyIdx === currJourneyIdx && diff < 0) {
                          let i = 0;
                          const interval = setInterval(() => {
                            if (i >= Math.abs(diff) - 1) {
                              setMouseDisable(false);
                              clearInterval(interval);
                            }
                            navAnn('prev', fableRef);
                            i++;
                          }, wait);
                          return;
                        }

                        if (diff < 0) {
                          if (clickedJourneyIdx === currJourneyIdx) {
                            let i = 0;
                            const interval = setInterval(() => {
                              if (i >= Math.abs(diff) - 1) {
                                setMouseDisable(false);
                                clearInterval(interval);
                              }
                              navAnn('prev', fableRef);
                              i++;
                            }, wait);
                            return;
                          } else {
                            const jrny = journeyData[clickedJourneyIdx];
                            const firstAnnRefId = jrny.annsInOrder[0].refId;
                            const firstAnnScreenId = jrny.annsInOrder[0].screenId;
                            goToFirstAnnOfModule(firstAnnScreenId, firstAnnRefId, fableRef);
                            setJourneyIndex(clickedJourneyIdx);
                            setCurrAnnRefId(firstAnnRefId);
                            if (clickedAnnIdx === 0) {
                              setMouseDisable(false);
                              return;
                            }
                            diff = clickedAnnIdx;
                          }
                        }

                        if (diff > 0) {
                          let i = 0;
                          const interval = setInterval(() => {
                            if (i >= diff - 1) {
                              setMouseDisable(false);
                              clearInterval(interval);
                            }
                            navAnn('next', fableRef);
                            i++;
                          }, 1500);
                          return;
                        }
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
