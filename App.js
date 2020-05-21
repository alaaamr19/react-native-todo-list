import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";

export default function App() {
  const [list, setlist] = useState([
    {
      title: "do stuff",
      case: true
    },
    {
      title: "do another-thing",
      case: false
    },
    {
      title: "do ay 7aga",
      case: true
    }
  ]);

  const [status, setstatus] = useState("all");
  const [value, setvalue] = useState("");
  const [renderdList, setRenderedList] = useState();

  useEffect(() => {
    if (status == "all") {
      setRenderedList(list);
    } else if (status == "done") {
      setRenderedList(
        list.filter(item => {
          return item.case == true;
        })
      );
      console.log(renderdList);
    } else {
      setRenderedList(
        list.filter(item => {
          return item.case == false;
        })
      );
      console.log(renderdList);
    }
  }, [status, list]);

  const handelitempress = (itemTitle, itemCase) => {
    console.log(itemCase);
    let newlist = [];
    list.map(el => {
      if (el.title != itemTitle) {
        newlist.push(el);
      } else {
        newlist.push({ title: itemTitle, case: !itemCase });
      }
    });
    console.log(newlist);
    setlist(newlist);
    console.log(list);
  };

  const handelPress = () => {
    setlist([...list, { title: value, case: false }]);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headertext}>Baby Shark</Text>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text
            style={{
              marginStart: 30,
              textAlign: "center",
              color: "#fff",
              fontSize: 20
            }}
          >
            Todo
          </Text>
          <Text style={{ textAlign: "center", color: "#fff", marginTop: 5 }}>
            _dododododod
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TextInput
            style={styles.buttons}
            value={value}
            onChangeText={setvalue}
          />
          <TouchableOpacity
            onPress={() => {
              handelPress();
            }}
          >
            <Ionicons name="md-add-circle" size={24} color="coral" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setstatus("all");
            }}
            style={styles.buttons}
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setstatus("active");
            }}
            style={styles.buttons}
          >
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setstatus("done");
            }}
            style={styles.buttons}
          >
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={renderdList}
        renderItem={({ item }) => (
          <Item
            style={styles.item}
            title={item.title}
            case={item.case}
            handelitempress={handelitempress}
          />
        )}
        keyExtractor={item => item.title}
        // / ListHeaderComponent={<Header />}
      />
    </View>
  );
}
function Item(props) {
  const [icon, setIcon] = useState();
  const [casee, setCasee] = useState();
  useEffect(() => {
    setCasee(props.case);
    if (casee == false) {
      setIcon("square");
    } else if (casee == true) {
      setIcon("check-square");
    }
  }, [casee]);
  return (
    <TouchableOpacity
      style={{ flex: 1, flexDirection: "row" }}
      onPress={() => {
        setCasee(!props.case);
        props.handelitempress(props.title, props.case);
      }}
    >
      <Feather name={icon} size={24} color="coral" />
      <Feather name={icon} size={24} color="black" />
      <Text style={{ color: "coral" }}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  headertext: {
    flex: 1,
    color: "coral",
    fontStyle: "italic",
    fontSize: 32,
    textAlign: "center",
    borderRadius: 20
  },

  item: {
    width: 10,
    backgroundColor: "#f00"
  },
  buttons: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  }
});
