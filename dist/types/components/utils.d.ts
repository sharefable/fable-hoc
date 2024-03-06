import { JourneyModuleWithAnns } from './types';
export declare const navAnn: (dir: 'prev' | 'next', fableRef: React.RefObject<HTMLIFrameElement>) => void;
export declare const goToParticularAnn: (screenId: number, refId: string, fableRef: React.RefObject<HTMLIFrameElement>) => void;
export declare const calculateDiff: (clickedAnnIdx: number, currAnnIdx: number, clickedJourneyIdx: number, currJourneyIdx: number, journeyData: JourneyModuleWithAnns[]) => number;
