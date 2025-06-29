import React, { useEffect, useState, useCallback } from 'react';
import { Image, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
import Separator from '@/components/Separator';
import { fetchStockData } from '@/utils/retrieveStock';
import type { StockData, StockItem } from '@/utils/retrieveStock';
import Timer from "@/components/Timer";
import Section from "@/components/Section";
import {calculateRestockTime} from "@/utils/calculateRestockTime";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function StockTab() {
    const [data, setData] = useState<StockData | null>(null);
    const [loading, setLoading] = useState(true);
    const [calculatedRestockTimers, setCalculatedRestockTimers] = useState(calculateRestockTime());

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchStockData();
            setData(result);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        setCalculatedRestockTimers(calculateRestockTime());
    }, []);

    useEffect(() => {
        loadData();
        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            for (const [key, value] of Object.entries(calculatedRestockTimers)) {
                if (currentTime > value) {
                    setCalculatedRestockTimers(calculateRestockTime());
                    break;
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [calculatedRestockTimers]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.container}>
                <Text>Failed to load data.</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={loadData} />
            }
        >
            <Section title="Seeds" refreshTime={calculatedRestockTimers.seeds} items={data.seedsStock} imageData={data.imageData} />
            <Section title="Gear" refreshTime={calculatedRestockTimers.gear} items={data.gearStock} imageData={data.imageData} />
            <Section title="Eggs" refreshTime={calculatedRestockTimers.eggs} items={data.eggStock} imageData={data.imageData} />
            <Section title="Cosmetics" refreshTime={calculatedRestockTimers.cosmetics} items={data.cosmeticsStock} imageData={data.imageData} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        margin: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        width: '95%',
        marginBottom: 8,
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
    },
});