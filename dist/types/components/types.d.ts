export interface JourneyFlow {
    header1: string;
    header2: string;
    main: string;
}
export interface IAnnotationConfigWithScreenId extends IAnnotationConfig {
    screenId: number;
}
export interface Payload_AnnotationNav {
    currentAnnotationRefId: string;
    journeyIndex: number | null;
    demoRid: string;
}
export type EventMessageResponse = Payload_AnnotationNav | Payload_DemoLoadingFinished;
export interface Payload_DemoLoadingFinished {
    annConfigs: IAnnotationConfig[];
    journeyData: JourneyModuleWithAnns[] | null;
    demoRid: string;
}
export interface JourneyModuleWithAnns extends JourneyFlow {
    annsInOrder: IAnnotationConfigWithScreenId[];
}
export interface IAnnotationConfig extends IAnnotationOriginConfig {
    syncPending: boolean;
}
export interface NavigateToAnnMessage<T> extends MessageEvent {
    data: Msg<T>;
}
interface Msg<T> extends MsgBase {
    payload: T;
}
interface MsgBase {
    sender: 'sharefable.com';
    type: ExtMsg;
}
export declare enum ExtMsg {
    DemoLoadingStarted = "demo-loading-started",
    DemoLoadingFinished = "demo-loading-finished",
    OnNavigation = "on-navigation",
    JourneySwitch = "journey-switch",
    NavToAnnotation = "navigate-to-annotation"
}
export interface Payload_NavToAnnotation {
    refId?: string;
    action?: 'prev' | 'next';
}
declare const AnnotationSelectionShape: readonly ["box", "pulse"];
declare type AnnotationSelectionShapeType = typeof AnnotationSelectionShape[number];
declare const AnnotationButtonLayout: readonly ["default", "full-width"];
declare type AnnotationButtonLayoutType = typeof AnnotationButtonLayout[number];
type CustomAnnDims = {
    width: number;
};
interface ITourEntityHotspot {
    type: 'el' | 'an-btn';
    on: 'click';
    target: string;
    actionType: 'navigate' | 'open';
    actionValue: string;
}
declare enum AnnotationButtonSize {
    Large = "large",
    Medium = "medium",
    Small = "small"
}
declare enum AnnotationButtonStyle {
    Primary = "primary",
    Link = "link",
    Outline = "outline"
}
type IAnnotationButtonType = 'next' | 'prev' | 'custom';
interface IAnnotationButton {
    id: string;
    type: IAnnotationButtonType;
    text: string;
    style: AnnotationButtonStyle;
    size: AnnotationButtonSize;
    exclude?: boolean;
    order: number;
    hotspot: ITourEntityHotspot | null;
}
declare enum CustomAnnotationPosition {
    TOP_LEFT = "c-top-left",
    TOP_CENTER = "c-top-center",
    TOP_RIGHT = "c-top-right",
    RIGHT_TOP = "c-right-top",
    RIGHT_CENTER = "c-right-center",
    RIGHT_BOTTOM = "c-right-bottom",
    BOTTOM_RIGHT = "c-bottom-right",
    BOTTOM_CENTER = "c-bottom-center",
    BOTTOM_LEFT = "c-bottom-left",
    LEFT_BOTTOM = "c-left-bottom",
    LEFT_CENTER = "c-left-center",
    LEFT_TOP = "c-left-top"
}
declare enum AnnotationPositions {
    Auto = "auto"
}
type EAnnotationBoxSize = 'small' | 'medium' | 'large' | 'custom';
declare enum VideoAnnotationPositions {
    BottomRight = "bottom-right",
    BottomLeft = "bottom-left",
    Center = "center",
    Follow = "follow"
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
    positioning: AnnotationPositions | VideoAnnotationPositions | CustomAnnotationPosition;
    buttons: IAnnotationButton[];
    type: 'cover' | 'default';
    size: EAnnotationBoxSize;
    customDims: CustomAnnDims;
    isHotspot: boolean;
    hideAnnotation: boolean;
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
export {};
