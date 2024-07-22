export interface Response{
    id: Number|null,
    success:boolean
}

export interface IsGranted{
    message : String,
    success : boolean
}

export interface PaginatorData {
    totalCount: number,
    endPage: number,
    startPage: number,
    current: number,
    pageCount: number,
    previous: boolean | null,
    next: boolean | null
}

export interface ResponseList {
    results : any[],
    paginatorData : PaginatorData
}

export interface Language {
    key : string;
    name : string;
    flag : string;
  }
  

