import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AwesomeAlert from "react-native-awesome-alerts";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Card from "../../components/UI/Card";

const CartScreen = (props) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const hideAlert = () => {
    setShowAlert(false);
  };
  const addOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
    setShowAlert(true);
  };
  const customView = () => {
    return (
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/bookingConfirmImage.png")}
        />
        <Text
          style={{ fontSize: 20, fontFamily: "openSansBold", color: "green" }}
        >
          Service Booked
        </Text>
        <Text>
          You have successfully booked the service for your device and you will
          shortly recieve a call from service center for the confirmation of
          booking.
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {showAlert ? (
          <View style={styles.container}>
            <AwesomeAlert
              customView={
                <View>
                  <Image
                    style={styles.image}
                    source={require("../../assets/bookingConfirmImage.png")}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "openSansBold",
                      color: "green",
                      marginLeft: 70,
                      marginBottom: 20,
                    }}
                  >
                    Service Booked
                  </Text>
                  <Text style={{ margin: 2 }}>
                    You have successfully booked the service for your device and
                    you will shortly recieve a call from service center for the
                    confirmation of booking.
                  </Text>
                </View>
              }
              show={showAlert}
              showProgress={false}
              closeOnTouchOutside
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton
              cancelText="cancel"
              confirmText="Back to Home"
              confirmButtonColor="#4BB543"
              onCancelPressed={() => {
                hideAlert();
              }}
              onConfirmPressed={() => {
                hideAlert();
                props.navigation.navigate("ProductsOverview");
              }}
            />
          </View>
        ) : null}
        {IsLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.primary}
            title="Confirm Booking"
            disabled={cartItems.length === 0}
            onPress={addOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};
CartScreen.navigationOptions = {
  headerTitle: "Your Orders",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  image: {
    height: 140,
    width: 140,
    marginLeft: 80,
    marginBottom: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "openSansBold",
    fontSize: 18,
  },
  amount: {
    color: Colors.secondary,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
});

export default CartScreen;
