import { ReactNode } from 'react';

export interface IComponent {
    componentId: string;
    name: string;
    type: string;
    position: number;
    urlImageComponent: string;
    customizable : boolean;
    properties: { [key: string]: any }; 
    children?: IComponent[]; 
    data : IDataComponent;
}

export interface IDataComponent {
    image : string,
    images : string[],
    slides: ISliderProp [];
    properties: { [key: string]: any }; 
}


export interface GridTemplatesProps {
    gridTemplateAreas: string[];
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    width?: string;
    height: string;
  }

  export interface ContainerProps extends GridTemplatesProps {
    children?: ReactNode;
  }

  export interface AreaTemplatesProps {
    gridArea: string;
    background: string;
    padding: string;
  }

  export interface AsideProps extends AreaTemplatesProps {
    children?: ReactNode;
  }

  export interface MainProps extends AreaTemplatesProps {
    children?: ReactNode;
  }

  export interface HeaderFooterProps extends AreaTemplatesProps {
    children?: ReactNode;
  }

  export type ParamsComponent = {
    components : IComponent
 }
  

export interface ISliderProp {
  title: string;
  text: string;
  link: string;
}

export interface SliderProps {
  slides: ISliderProp [];
}


export interface ScreenDataDto {
  layoutId : string;
  name     : string;
  title    : string;
  dataIdLayout : string;
  screenId : string;
}

export interface ScreenLayout {
  screenId : string;
  layoutMetadata: IComponent;
}

export interface ResponseBase {
  statusCode: string;
  message   : string;
}

export interface ViewScreenData {
  name? :string;
  screenDataId? : string;
  timeStart?    : string;
  timeEnd?      : string;
  dateStart?    : string;
  dateEnd?      : string;
  timestampStart? : Date;
  timestampEnd?   : Date;
}

export interface DeviceInfoDto {
  id?       : string;
  name?     : string,
  tenantId? : string;
  macaddress?: string;
  maker?     : string;
  model?     : string;
  system?    : string;
  viewsScreen? : ViewScreenData[]
}

export interface CreateUserDto {
   firstName? : string,
   lastName?  : string,
   email?     : string,
   cellphone? : string,
   timezone?  : string,
   username?  : string,
   password?  : string,
   enabled    : boolean,
   waitingRoom : boolean,
}

export type ScheduledTaskDto = {
  id : string,
  kye : string,
  description : string,
  startDate : string,
  startTime : string,
  endDate : string,
  endTime : string
}

export interface BannerDto {
   id : string,
   startTimestamp : string,
   endTimestamp: string,
   segment : string,
   urlImage : string,
   actionType : string,
   actionData : Object,
}

export interface FileSystemShip {
  id : number,
  ranker? : number | null,
  child : FileSystemItem,
}

export interface FileSystemItem {
  id? : number,
  name? : string,
  type? : string,
  size? : number,
  path? : string,
  height? : number,
  width? : number,
  orientation?: string,
  parent? : FileSystemItem,
  children : FileSystemShip[]
}


