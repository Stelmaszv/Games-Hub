import { ResponseList } from "../../interface";

export interface PublisherAddForm {
    generalInformation:PublisherGeneralInformation,
    descriptions:PublisherDescriptions, 
    add: boolean
}

export interface PublisherDescriptions {
    en: null | string,
    pl: null | string,
    fr: null | string,
    [key: string]: null | string;
}

export interface PublisherGeneralInformation {
    name: string,
    origin: string|null,
    founded: string|null,
    website: string|null,
    headquarter: string|null
}

interface Description {
    url: string;
    lng: string;
}

export interface PublisherDescriptionsScraper{
    descriptions: Description[];
}

export interface GeneralInformationScraper{
    url : string
}

export interface GeneralInformationResponse extends Response{
    generalInformation: PublisherGeneralInformation,
}

export interface PublisherDescriptionsScraperResponse extends Response{
    description: PublisherDescriptions,
}

interface PublisherDesc{
    fr:string;
    pl:string;
    en:string
}

export interface Publisher{
    id: number;
  
    generalInformation: {
      name: string;
      headquarter: string|null;
      origin: string|null;
      founded: string|null;
      website: string|null;
    };

    descriptions: PublisherDesc
}
  
export interface PublisherPermissions{
  canShowPublisher: boolean;
  canEditPublisher: boolean;
  canDeletePublisher: boolean;
}

export interface PublisherList extends ResponseList{
    results : PublisherListElement[]
}

export interface PublisherListElement extends Publisher,PublisherPermissions {}