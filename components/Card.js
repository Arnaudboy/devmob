import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Dimensions,
    onTouchStart,
} from "react-native";
import {useState, useEffect, useCallback} from "react";

function Card(props) {

    return (
        <View style={styles.box}>
            <Text style={styles.text}>Pays : {props.pays}</Text>
            <Text style={styles.text}>Ville : {props.ville}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5,
    },
    text: {
        color: "white"
    }
})

export default Card;
