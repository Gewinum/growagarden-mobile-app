// Item with name and value
export interface StockItem {
    name: string;
    value: number;
}

// Last seen item with emoji and timestamp
export interface LastSeenItem {
    name: string;
    emoji: string;
    seen: string;
}

// Last seen categories
export interface LastSeen {
    Seeds: LastSeenItem[];
    Gears: LastSeenItem[];
    Weather: LastSeenItem[];
    Eggs: LastSeenItem[];
}

// Restock timers for each category
export interface RestockTimers {
    seeds: number;
    gears: number;
    eggs: number;
    honey: number;
    cosmetics: number;
}

// Category refresh status
export interface CategoryRefreshStatus {
    wasRefreshed: boolean;
    lastRefresh: number;
    timeSinceRefresh: number;
    expectingUpdate: boolean;
}

// All category refresh statuses
export interface CategoryRefreshStatuses {
    seeds: CategoryRefreshStatus;
    gears: CategoryRefreshStatus;
    eggs: CategoryRefreshStatus;
    honey: CategoryRefreshStatus;
    cosmetics: CategoryRefreshStatus;
}

// Main JSON structure
export interface StockData {
    easterStock: StockItem[];
    gearStock: StockItem[];
    eggStock: StockItem[];
    nightStock: StockItem[];
    honeyStock: StockItem[];
    cosmeticsStock: StockItem[];
    seedsStock: StockItem[];
    lastSeen: LastSeen;
    restockTimers: RestockTimers;
    categoryRefreshStatus: CategoryRefreshStatuses;
    timerCalculatedAt: number;
    serverStartTime: number;
    lastApiFetch: number;
    nextScheduledFetch: number;
    imageData: Record<string, string>;
}

export async function fetchStockData(): Promise<StockData> {
    const response = await fetch('https://growagarden.gg/api/stock', { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.statusText}`);
    }
    const data = await response.json();
    return data as StockData;
}