import { Dimensions, StyleSheet, TextInput, View, Text, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import data from "../Data/Cities.json";
import { SafeAreaView } from "react-native-safe-area-context";

const Item = ({ title, navigation }) => {
  const onNavigate = () => navigation.navigate("Edit")
  return (<View>
            <Text>{title}</Text>
            <Button title="détails" label="détails" onPress={onNavigate} />
          </View>)
};

const Search = () => {
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [result, setResult] = useState(data.cities);
  const onChangePays = (value) => {
    setPays(value);
  };
  const onChangeVille = (value) => {
    setVille(value);
  };

  useEffect(() => {
    if(ville !== "") {
      setResult(data.cities.filter(city => city.name.includes(ville)))
    }
    if(pays !== "") {
      setResult(data.cities.filter(city => city.country.includes(pays)));
    }
  }, [ville, pays]);

  const renderCity = ({ item }) => (
    <Item title={item.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.input} placeholder="Pays" value={pays} onChangeText={onChangePays}></TextInput>
      <TextInput style={styles.input} placeholder="Ville" value={ville} onChangeText={onChangeVille}></TextInput>
      <FlatList data={result}
                renderItem={renderCity}
                keyExtractor={item => item.geonameid}
      />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    width: Dimensions.get("window").width - 64,
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
  },
});

export default Search;
