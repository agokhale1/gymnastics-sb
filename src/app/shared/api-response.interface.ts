export interface ApiResponse<T> {
    records: T[];
    code?: number;
    message?: string;
}
