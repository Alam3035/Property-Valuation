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
  },
  districtbox: {
    flexDirection: 'row',
  },
  districtbar: {
    flexDirection: 'row',
    alignItems: 'center'
  }, 
  searchInput: {
    height: 50,
    width: 350,
    flexGrow: 1,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },


});
export default homeStyles;
