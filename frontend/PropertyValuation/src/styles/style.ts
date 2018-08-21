import { StyleSheet, Dimensions } from "react-native";

// Home.tsx
const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  homePanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: 100,
    backgroundColor: "beige"
  },
  homeListItem: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row"
  },
  item: {
    backgroundColor: "green",
    fontSize: 16,
    textAlign: "left",
    padding: 20,
    width: Dimensions.get("window").width
    // width: 270
  }
});
export default homeStyles;
