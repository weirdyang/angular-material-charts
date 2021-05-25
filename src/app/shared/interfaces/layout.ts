export interface LayoutContainer {
    columns: number;
    miniCard: LayoutItem;
    chart: LayoutItem;
    table: LayoutItem;
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
