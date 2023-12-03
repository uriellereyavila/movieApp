import { SortDirection } from "../enums/sort-direction.enum";
import { Sort } from "../enums/sort.enum";

export interface SortBy {
    property: Sort,
    direction: SortDirection
}