import {StockItem} from "@/utils/retrieveStock";
import {View, Text} from "@/components/Themed";
import Timer from "@/components/Timer";
import Separator from "@/components/Separator";
import {Image, StyleSheet} from "react-native";
import React from "react";

export default function Section({ title, refreshTime, items, imageData }: { title: string, refreshTime: number, items: StockItem[], imageData: Record<string, string> }) {
    return (
        <>
            <Text style={styles.title}>{title}</Text>
            <Timer unixTime={refreshTime} />
            {items.map((item: StockItem, index: number) => (
                <View key={index} style={styles.itemContainer}>
                    <Image
                        source={{ uri: imageData[item.name] }}
                        style={{ width: 50, height: 50 }}
                    />
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.value}x</Text>
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
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