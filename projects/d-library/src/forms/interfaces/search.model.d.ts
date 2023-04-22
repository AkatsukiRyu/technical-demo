
// current now search ignore case;
export interface SearchConfigurationModel {
    data: Array<any>;
    prequisitionType: 'AND' | 'OR';
    searchBys: string[]; // Handle more kind of search and algorith by pushing define here.
    callback: (...filterItems: Array<any>) => void;
}
