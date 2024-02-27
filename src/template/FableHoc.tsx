import React, { useCallback, useState, useRef, useEffect } from 'react';
import FableEmbed from '../components/FableEmbed';
import { navAnn, goToFirstAnnOfModule } from '../components/utils';
import { IAnnotationConfig, JourneyModuleWithAnns } from '../components/types';

interface IProps {
  layout?: 'row' | 'col';
  origin?: string;
  demoRid: string;
}

const FableHoc = ({ layout = 'col', origin, demoRid, ...rest }: IProps) => {
  const [currAnnRefId, setCurrAnnRefId] = useState<string>('');
  const [isAnnLoaded, setIsAnnLoaded] = useState(false);
  const [journeyData, setJourneyData] = useState<JourneyModuleWithAnns[] | null>(null);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const fableRef = useRef<HTMLIFrameElement>(null);
  const fableConRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [disableMouse, setMouseDisable] = useState(false);

  const onLoaded = useCallback((
    annConfigsArr: IAnnotationConfig[],
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
    if (!target) return;
    if (layout === 'row') {
      const center = target.offsetTop - window.innerHeight / 2;
      window.scrollTo({
        top: center,
        behavior: 'smooth',
      });
    } else {
      const bottomFableCon = fableConRef.current?.getBoundingClientRect().bottom;
      const targetTop = target.getBoundingClientRect().top;
      const targetHeight = target.getBoundingClientRect().height;
      window.scrollBy({
        top: targetTop - bottomFableCon! - targetHeight,
        behavior: 'smooth',
      });
    }
  }, [currAnnRefId]);

  return (
    <div
      style={{
        width: '100%',
        background: '#FFF7F1',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1440px',
        height: 'auto',
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
          display: 'grid',
          gridTemplateColumns: layout === 'col' ? '1fr' : '340px 1fr',
          gridTemplateRows: layout === 'col' ? '40rem 1fr' : '1fr',
          gap: '1rem',
          width: '100%',
          position: 'relative',
        }}>
        <div
          ref={fableConRef}
          style={{
            width: '100%',
            height: layout === 'col' ? 'auto' : 'fit-content',
            position: layout === 'row' ? 'sticky' : 'sticky',
            top: layout === 'row' ? '1.5rem' : '0',
            zIndex: 1,
          }}
        >
          <FableEmbed
            origin={origin}
            demoRid={demoRid}
            onLoaded={onLoaded}
            innerRef={fableRef}
            onAnnotationChange={onChange}
            style={{
              minHeight: layout === 'row' ? '40rem' : '100%',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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
          </div>
        </div>
        <div
          ref={textContainerRef}
          style={{
            margin: '1rem auto',
            cursor: disableMouse ? 'progress' : 'pointer',
            marginTop: layout === 'col' ? '4rem' : '2rem',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            maxWidth: layout === 'col' ? '40rem' : '20rem',
            scrollbarWidth: 'thin',
            maxHeight: '100%',
            position: layout === 'col' ? 'sticky' : 'static',
            top: layout === 'col' ? '1.5rem' : 'auto',
            order: layout === 'row' ? -1 : 0,
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
