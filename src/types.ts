// TypeScript interfaces and types shared across all FQ modules.

export type FQKind = "circle" | "rect";

export interface FQFraction {
  num: number;
  den: number;
  value: number;
  raw: unknown;
}

export interface FQRectDims {
  rows: number;
  cols: number;
}

export interface FQMeta {
  uid: string;
  kind: FQKind | "";
  target: FQFraction;
  locked: boolean;
  solved: boolean;
  revealed: boolean;
  ready: boolean;
  parts?: number;
  rows?: number;
  cols?: number;
}

export interface FQNodes {
  uid: string;
  kind: string;
  wrap: HTMLElement | null;
  host: HTMLElement | null;
  mount: HTMLElement | null;
  circleInput: HTMLInputElement | null;
  rowsInput: HTMLInputElement | null;
  colsInput: HTMLInputElement | null;
  quizSource: HTMLElement | null;
  quizInput: HTMLInputElement | null;
  observer: MutationObserver | null;
  _quizObserver: MutationObserver | null;
  _quizScope: HTMLElement | null;
  _quizClickHandler: ((e: Event) => void) | null;
  _quizBridgeInstalled: boolean;
}

export interface FQWidget {
  meta: FQMeta;
  nodes: FQNodes;
  state: boolean[];
  dims?: FQRectDims;
}

export interface FQWidgetSnapshot {
  state: boolean[];
  meta: Pick<FQMeta, "uid" | "kind" | "solved" | "revealed" | "locked" | "ready">;
}

export interface FQPublicAPI {
  mountCircle(uid: string, target: string): void;
  mountRect(uid: string, target: string): void;
  check(uid: string): boolean;
  onReveal(uid: string): boolean;
  destroy(): void;
  getAllWidgets(): Record<string, FQWidgetSnapshot>;
}

export interface MathQuizPublicAPI {
  refresh(): void;
  destroy(): void;
}
