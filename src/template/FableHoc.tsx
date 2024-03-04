import React, { useCallback, useState, useRef, useEffect } from 'react';
import FableEmbed from '../components/FableEmbed';
import './style.css';
import { navAnn, goToParticularAnn, calculateDiff } from '../components/utils';
import { IAnnotationConfig, JourneyModuleWithAnns } from '../components/types';

interface IProps {
  demoRid: string;
  layout?: 'sidebyside' | 'stacked';
  origin?: string;
  contentWidthPercentage?: number;
}

interface INavigationRef {
  direction: 'prev' | 'next';
  destinationRefId: string;
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
  const navigateRef = useRef<INavigationRef | null>(null);

  const navigate = (
    direction: 'next' | 'prev',
    noOfTimes: number,
    navAnn: (dir: 'prev' | 'next', fableRef: React.RefObject<HTMLIFrameElement>) => void,
    fableRef: React.RefObject<HTMLIFrameElement>,
    wait: number = 1500
  ) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= noOfTimes - 1) {
        clearInterval(interval);
      }
      navAnn(direction, fableRef);
      i++;
    }, wait);
  };

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
          // navigate('prev', Math.abs(diff), navAnn, fableRef, wait);
          setMouseDisable(false);
          return;
        } else {
          const jrny = journeyData[clickedJourneyIdx];
          const firstAnnRefId = jrny.annsInOrder[0].refId;
          const firstAnnScreenId = jrny.annsInOrder[0].screenId;
          goToParticularAnn(firstAnnScreenId, firstAnnRefId, fableRef);
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

    const destinationRefId = annConfigs && annConfigs.length > 0 ? annConfigs[clickedAnnIdx].refId : journeyData![clickedJourneyIdx!].annsInOrder[clickedAnnIdx].refId;
    console.log('destinationRefId', destinationRefId);
    navigateRef.current = {
      direction: diff < 0 ? 'prev' : 'next',
      destinationRefId,
    };
    setTimeout(() => {
      setMouseDisable(false);
      navAnn(diff < 0 ? 'prev' : 'next', fableRef);
    }, wait);
    return;

    if (diff < 0) {
      // navigate('prev', Math.abs(diff), navAnn, fableRef, wait);
      setMouseDisable(false);
      return;
    }
    if (diff > 0) {
      // navigate('next', Math.abs(diff), navAnn, fableRef, wait);
      setMouseDisable(false);
      return;
    }
  };

  useEffect(() => {
    console.log('currAnnRefId', currAnnRefId);
    if (navigateRef.current) {
      console.log('navigateRef.current', navigateRef.current);
      if (currAnnRefId === navigateRef.current.destinationRefId) {
        console.log('currAnnRefId === navigateRef.current.destinationRefId');
        setMouseDisable(false);
        navigateRef.current = null;
      } else {
        console.log(navigateRef.current.direction, fableRef);
        setTimeout(() => {
          navAnn(navigateRef.current.direction, fableRef);
        }, 1000);
      }
    }
  }, [currAnnRefId]);

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
    <div className="fable-hoc" {...rest}>
      <div className="con-module-f-hoc">
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
        className="con-fable-hoc"
        style={{
          gridTemplateColumns: layout === 'stacked' ? '1fr' : `${contentWidthPercentage}% auto`,
          gridTemplateRows: layout === 'stacked' ? 'auto 1fr' : '1fr',
        }}
      >
        <div
          className="con-demo"
          ref={fableConRef}
          style={{
            top: layout === 'sidebyside' ? '1.5rem' : '0',
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
          <div className="con-buttons">
            <span
              className="fable-nav"
              onClick={() => navAnn('prev', fableRef)}
            >
              Prev
            </span>
            <span
              className="fable-nav"
              onClick={() => navAnn('next', fableRef)}
            >
              Next
            </span>
          </div>
        </div>
        <div
          ref={textContainerRef}
          className="con-ann-text"
          style={{
            cursor: disableMouse ? 'progress' : 'pointer',
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
                className="con-text-journey"
              >
                {journey.annsInOrder.map((ann, idx) => {
                  return (
                    <div
                      style={{
                        boxShadow: currAnnRefId === ann.refId ? '0 0 0 2px rgba(0, 0, 0)' : '',
                      }}
                      className="ann-text"
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
                        <span className="ann-number">
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
                className="ann-text"
                style={{
                  boxShadow: currAnnRefId === ann.refId ? '0 0 0 2px rgba(0, 0, 0)' : '',
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
                  <span className="ann-number">
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
