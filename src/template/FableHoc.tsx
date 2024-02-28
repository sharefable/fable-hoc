import React, { useCallback, useState, useRef, useEffect } from 'react';
import FableEmbed from '../components/FableEmbed';
import { navAnn, goToFirstAnnOfModule, calculateDiff, navigate } from '../components/utils';
import { IAnnotationConfig, JourneyModuleWithAnns } from '../components/types';

interface IProps {
  demoRid: string;
  layout?: 'sidebyside' | 'stacked';
  origin?: string;
  contentWidthPercentage?: number;
}

const FableHoc = ({ layout = 'sidebyside', origin, demoRid, contentWidthPercentage = 30, ...rest }: IProps) => {
  const [currAnnRefId, setCurrAnnRefId] = useState<string>('');
  const [isAnnLoaded, setIsAnnLoaded] = useState(false);
  const [journeyData, setJourneyData] = useState<JourneyModuleWithAnns[] | null>(null);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [annConfigs, setAnnConfigs] = useState<IAnnotationConfig[]>([]);
  const fableRef = useRef<HTMLIFrameElement>(null);
  const fableConRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [disableMouse, setMouseDisable] = useState(false);

  const handleNavigation = (
    diff: number,
    clickedJourneyIdx: number | undefined,
    currJourneyIdx: number | undefined,
    clickedAnnIdx: number,
    journeyData: JourneyModuleWithAnns[] | null,
    wait: number,
  ) => {
    if (diff === 0) {
      setMouseDisable(false);
      return;
    }
    setMouseDisable(true);
    if (journeyData && currJourneyIdx !== undefined && clickedJourneyIdx !== undefined) {
      if (diff < 0) {
        if (clickedJourneyIdx === currJourneyIdx) {
          navigate('prev', Math.abs(diff), navAnn, fableRef, wait);
          setMouseDisable(false);
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
    }

    if (diff < 0) {
      navigate('prev', Math.abs(diff), navAnn, fableRef, wait);
      setMouseDisable(false);
      return;
    }
    if (diff > 0) {
      navigate('next', Math.abs(diff), navAnn, fableRef, wait);
      setMouseDisable(false);
      return;
    }
  };

  const handleAnnotationClick = (idx: number, jIdx: number = 0) => {
    const journeyPresent = journeyData && journeyData.length > 0;
    let clickedJourneyIdx;
    let currJourneyIdx;
    let currAnnIdx;
    const clickedAnnIdx = idx;
    const wait = 1500;
    let diff: number = 0;
    if (journeyPresent) {
      clickedJourneyIdx = jIdx;
      currJourneyIdx = journeyIndex;
      currAnnIdx = journeyData[currJourneyIdx].annsInOrder.findIndex((ann) => ann.refId === currAnnRefId);
      diff = calculateDiff(clickedAnnIdx, currAnnIdx, clickedJourneyIdx, currJourneyIdx, journeyData);

    } else {
      currAnnIdx = annConfigs.findIndex((ann) => ann.refId === currAnnRefId);
      diff = clickedAnnIdx - currAnnIdx;
    }
    handleNavigation(diff, clickedJourneyIdx, currJourneyIdx, clickedAnnIdx, journeyData, wait);
  };

  const onLoaded = useCallback((
    annConfigsArr: IAnnotationConfig[],
    demoUrl: string,
    demoDisplayName: string,
    demoRid: string,
    jrnyData: JourneyModuleWithAnns[] | null,
  ) => {
    setIsAnnLoaded(true);
    console.log('Loaded...', annConfigsArr, demoUrl, demoDisplayName, demoRid, jrnyData);
    if (annConfigsArr && annConfigsArr.length) {
      setAnnConfigs(annConfigsArr);
      setCurrAnnRefId(annConfigsArr[0].refId);
      return;
    } else {
      setJourneyData(jrnyData);
      if (!jrnyData?.length) return;
      setCurrAnnRefId(jrnyData[0].annsInOrder[0].refId);
    }
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
    if (layout === 'sidebyside') {
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
        {journeyData && journeyData?.map((item) => (
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
          gridTemplateColumns: layout === 'stacked' ? '1fr' : `${contentWidthPercentage}% auto`,
          gridTemplateRows: layout === 'stacked' ? 'auto 1fr' : '1fr',
          gap: '1rem',
          width: '100%',
          position: 'relative',
        }}>
        <div
          ref={fableConRef}
          style={{
            width: '100%',
            height: 'fit-content',
            position: 'sticky',
            top: layout === 'sidebyside' ? '1.5rem' : '0',
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
              minHeight: layout === 'sidebyside' ? '40rem' : '30rem',
              marginTop: '0',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              gap: '2rem',
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
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            scrollbarWidth: 'thin',
            maxHeight: '100%',
            position: layout === 'stacked' ? 'sticky' : 'static',
            top: layout === 'stacked' ? '1.5rem' : 'auto',
            order: layout === 'sidebyside' ? -1 : 0,
            width: layout === 'stacked' ? contentWidthPercentage + '%' : 'auto',
          }}
        >
          {journeyData && journeyData?.map((journey, jIdx) => {
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
                        handleAnnotationClick(idx, jIdx);
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
          {annConfigs && annConfigs.length > 0 && annConfigs.map((ann, idx) => {
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
                  handleAnnotationClick(idx);
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
      </div>
    </div>
  );
};

export default FableHoc;
