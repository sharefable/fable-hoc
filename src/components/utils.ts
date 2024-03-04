import { JourneyModuleWithAnns } from './types';

export const navAnn = (
  dir: 'prev' | 'next',
  fableRef: React.RefObject<HTMLIFrameElement>
) => {
  const win = fableRef.current;
  if (win) {
    win.contentWindow?.postMessage(
      {
        type: 'navigate-to-annotation',
        sender: 'sharefable.com',
        payload: {
          action: dir
        }
      },
      '*'
    );
  }
};

export const goToParticularAnn = (
  screenId: number,
  refId: string,
  fableRef: React.RefObject<HTMLIFrameElement>
) => {
  const win = fableRef.current;
  if (win) {
    win.contentWindow?.postMessage(
      {
        type: 'navigate-to-annotation',
        sender: 'sharefable.com',
        payload: {
          main: `${screenId}/${refId}`
        }
      },
      '*'
    );
  }
};

export const calculateDiff = (
  clickedAnnIdx: number,
  currAnnIdx: number,
  clickedJourneyIdx: number,
  currJourneyIdx: number,
  journeyData: JourneyModuleWithAnns[]
) => {
  let diff = 0;
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
  return diff;
};

export const navigate = (
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
