import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native'
import { Card, Icon, Rating, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable'


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

function RenderDish(props) {
    const dish = props.dish

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200) {
            return true
        }
        else {
            return false
        }
    }

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        }
        ,
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to Favorite?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'Ok',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                        }
                    ],
                    { cancelable: false }
                )
                return true
            }
            if (recognizeComment(gestureState)) {
                props.commentsModal()
            }
            return true
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        })
    }

    if (dish != null) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            type='font-awesome'
                            name={'pencil'}
                            color='#512DA8'
                            onPress={() => props.commentsModal()}
                        />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        )
    }
    else {
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments
    const renderCommentItems = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating
                    readonly
                    startingValue={item.rating}
                    style={{ fontSize: 12, marginVertical: 5, textAlign: 'left' }}
                    imageSize={20}
                />
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }
    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItems}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    )
}

const authorInput = React.createRef();
const commentInput = React.createRef();


class Dishdetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            comment: ''
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleCommentsModal() {
        console.log(JSON.stringify(this.state))
        this.toggleModal()
    }

    resetForm() {
        this.setState({ rating: 5, author: '', comment: '' })
        authorInput.current.clear()
        commentInput.current.clear()
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    handleComment(dishId) {
        this.props.postComment({
            dishId,
            ratting: this.state.rating,
            comment: this.state.comment,
            author: this.state.author
        })
        this.resetForm()
    }

    static navigationOptions = {
        title: 'Dish Details'
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    commentsModal={() => { this.handleCommentsModal(); this.setState({ dishId }) }}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            onFinishRating={(rating) => { this.setState({ rating }) }}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            ref={authorInput}
                            leftIcon={
                                <Icon
                                    type='font-awesome'
                                    name='user-o'
                                    paddingHorizontal={10}
                                    size={24}
                                    color='black'
                                />
                            }
                            placeholder='Author'
                            onChangeText={(author) => { this.setState({ author }) }}
                        />
                        <Input
                            ref={commentInput}
                            leftIcon={
                                <Icon
                                    type='font-awesome'
                                    name='comment-o'
                                    paddingHorizontal={10}
                                    size={24}
                                    color='black'
                                />
                            }
                            placeholder='Comment'
                            onChangeText={(comment) => { this.setState({ comment }) }}
                        />
                        <View style={styles.modalText}>
                            <Button
                                onPress={() => { this.handleComment(dishId); this.resetForm(); this.toggleModal() }}
                                color='#512DA8'
                                title='SUBMIT'
                            />
                        </View>
                        <View style={styles.modalText}>
                            <Button
                                onPress={() => { this.toggleModal(); this.resetForm() }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail)