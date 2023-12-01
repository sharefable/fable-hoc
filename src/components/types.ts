export interface IFableData {
  version: number
  demoRid: string
  env: 'staging' | 'prod'
  loadingContent: {
    md: string
  }
  content: Array<{ index: number, md: React.ReactNode }>
}

export interface IAnnotationConfig extends IAnnotationOriginConfig {
  syncPending: boolean;
}

const AnnotationSelectionShape = ['box', 'pulse'] as const;
declare type AnnotationSelectionShapeType = typeof AnnotationSelectionShape[number];
const AnnotationButtonLayout = ['default', 'full-width'] as const;
declare type AnnotationButtonLayoutType = typeof AnnotationButtonLayout[number];

type CustomAnnDims = {
  width: number,
}

interface ITourEntityHotspot {
  type: 'el' | 'an-btn',
  on: 'click',
  target: string;
  actionType: 'navigate' | 'open';
  actionValue: string;
}

enum AnnotationButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small'
}

enum AnnotationButtonStyle {
  Primary = 'primary',
  Link = 'link',
  Outline = 'outline'
}

type IAnnotationButtonType = 'next' | 'prev' | 'custom';

interface IAnnotationButton {
  id: string;
  type: IAnnotationButtonType
  text: string;
  style: AnnotationButtonStyle;
  size: AnnotationButtonSize;
  exclude?: boolean;
  // This is used to sort buttons for display
  // next button normally have very high order since it would be towards the end
  // prev button normally have very low order since it would be towards the start
  // all the other buttons are in between
  order: number;
  // TODO right now hotspots are created from here for. Later on with other entity check where
  // the hotspot could be created
  hotspot: ITourEntityHotspot | null;
}

enum CustomAnnotationPosition {
  TOP_LEFT = 'c-top-left',
  TOP_CENTER = 'c-top-center',
  TOP_RIGHT = 'c-top-right',
  RIGHT_TOP = 'c-right-top',
  RIGHT_CENTER = 'c-right-center',
  RIGHT_BOTTOM = 'c-right-bottom',
  BOTTOM_RIGHT = 'c-bottom-right',
  BOTTOM_CENTER = 'c-bottom-center',
  BOTTOM_LEFT = 'c-bottom-left',
  LEFT_BOTTOM = 'c-left-bottom',
  LEFT_CENTER = 'c-left-center',
  LEFT_TOP = 'c-left-top'
}

enum AnnotationPositions {
  Auto = 'auto',
}

type EAnnotationBoxSize = 'small' | 'medium' | 'large' | 'custom';

enum VideoAnnotationPositions {
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
  Center = 'center',
  Follow = 'follow',
}

interface IChronoUpdatable {
  monoIncKey: number;
  createdAt: number;
  updatedAt: number;
}

interface IAnnotationOriginConfig extends IChronoUpdatable {
  id: string;
  refId: string;
  grpId: string;
  bodyContent: string;
  displayText: string;
  positioning: AnnotationPositions | VideoAnnotationPositions | CustomAnnotationPosition,
  buttons: IAnnotationButton[],
  type: 'cover' | 'default',
  size: EAnnotationBoxSize,
  customDims: CustomAnnDims,
  isHotspot: boolean,
  hideAnnotation: boolean,
  videoUrl: string;
  hotspotElPath: string | null;
  videoUrlHls: string;
  videoUrlMp4: string;
  videoUrlWebm: string;
  showOverlay: boolean;
  buttonLayout: AnnotationButtonLayoutType;
  selectionShape: AnnotationSelectionShapeType;
  targetElCssStyle: string;
  annCSSStyle: string;
  annotationSelectionColor: string;
}


