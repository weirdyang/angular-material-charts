export interface LayoutContainer {
  columns: number;
  top: LayoutItem;
  middle: LayoutItem;
  bottom: LayoutItem;
}
export interface LayoutItem {
  cols: number;
  rows: number;
  data: any[];
}

export interface IObjectKeys {
  [key: string]: string | number | boolean;
}
interface ScreenSize {
  [key: string]: boolean;
}
