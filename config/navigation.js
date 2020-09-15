import React, { Component } from 'react';
import Menu from '../components/MenuComponent'
import Dishdetail from '../components/DishDetailComponent';
import Home from '../components/HomeComponent'
import Contacts from '../components/ContactComponent'
import About from '../components/AboutComponent'
import Reservation from '../components/ReservationComponent'
import Favorites from '../components/FavoriteComponent'
import Login from '../components/LoginComponent'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, SafeAreaView } from 'react-navigation'


const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    },
    Dishdetail: { screen: Dishdetail }
}, {
    initialRouteName: 'Menu',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
    }
})

const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
})

const AboutUsNavigator = createStackNavigator({
    "About Us": {
        screen: About,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
})

const ContactNavigator = createStackNavigator({
    ' ': {
        screen: Contacts,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
})

const ReservationNavigator = createStackNavigator({
    ' ': {
        screen: Reservation,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
})

const FavoritesNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
})

const LoginNavigator = createStackNavigator({
    ' ': {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()} />
        })
    }
})

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image
                        source={require('../components/images/logo.png')}
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
)

const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About: {
        screen: AboutUsNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Contacts: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Reservations: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default createAppContainer(MainNavigator);
