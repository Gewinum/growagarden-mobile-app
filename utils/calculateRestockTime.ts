export type RestockTime = {
    seeds: number;
    gear: number;
    eggs: number;
    cosmetics: number;
};

/**
 * API does return times but they are not accurate.
 * Here we calculate them properly.
 */
export function calculateRestockTime() {
    const restockTime: RestockTime = {
        seeds: 0,
        gear: 0,
        eggs: 0,
        cosmetics: 0,
    };
    const now = Date.now() / 1000;

    restockTime.gear = Math.ceil(now / (5 * 60)) * 5 * 60;
    restockTime.seeds = Math.ceil(now / (5 * 60)) * 5 * 60;
    restockTime.eggs = Math.ceil(now / (30 * 60)) * 30 * 60;
    restockTime.cosmetics = Math.ceil(now / (4 * 60 * 60)) * 4 * 60 * 60;

    return restockTime;
}