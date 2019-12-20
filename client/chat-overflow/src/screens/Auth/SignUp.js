import React from 'react';
import {
	TextInput,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Alert
} from 'react-native';
import { DeviceWidth, DeviceHeight } from '../../../Device/index';
import AppStore from '../../store/AppStore';
import Axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	_changeEmailInput = (email) => {
		this.setState({
			email
		})
	}

	_changePasswordInput = (password) => {
		this.setState({
			password
		})
	}

	_signup = async () => {
		AppStore.setLoading(true)

		await Axios.post('http://192.168.43.75:3000/user/signup', {
			'mail': this.state.email,
			'password': this.state.password
		}).then(response => {
			console.log(response.data)
			if (response.data.status == 200) {
				//Alert.alert(response.data.message)
				AppStore.setUid(response.data.uid)
				const resetAction = StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ routeName: 'ChatNavigator' })],
				});
				this.props.navigation.dispatch(resetAction);
			} else {
				Alert.alert(response.data.message)
			}

		})
			.catch((err) => {
				console.log('Erreur : ' + err)
			})

		AppStore.setLoading(false)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.headerSubContainer}>
						<Text style={styles.header}>ÜYE OL</Text>
					</View>
				</View>

				<View style={styles.inputContainer}>

					<View styles={{ flex: 1, }}>
						<View style={styles.subInputContainer}>

							<TextInput
								placeholder='  Email'
								placeholderTextColor='#ccc'
								autoCapitalize='none'
								returnKeyType={'next'}
								onSubmitEditing={() => { this.passwordInput.focus() }}
								blurOnSubmit={false}
								style={styles.input}
								value={this.state.email}
								onChangeText={this._changeEmailInput}
							/>
						</View>
						<View style={styles.subInputContainer}>

							<TextInput
								secureTextEntry={true}
								placeholder='  Password'
								placeholderTextColor='#ccc'
								autoCapitalize='none'
								returnKeyType={'go'}
								ref={input => { this.passwordInput = input }}
								style={styles.input}
								value={this.state.password}
								onChangeText={this._changePasswordInput}
							/>
						</View>
					</View>

					<View style={styles.submit}>
						<TouchableOpacity style={{ height: 65, }} onPress={this._signup}>
							<Text style={styles.button}>Sign Up</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.line}>

					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	forgotten: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#171f33',
		marginBottom: 5,
	},
	input: {
		height: 55,
		width: DeviceWidth - 100,
		padding: 5,
		marginRight: 5,
		borderWidth: 2,
		borderRadius: 4,
		borderColor: '#f5f5f5',
		fontSize: 16,
		backgroundColor: '#f8f8f8',
		fontWeight: '600',
		elevation: 8,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * 8 },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * 8,
	},
	icon: {
		borderWidth: 2,
		borderRadius: 4,
		borderColor: '#f5f5f5',
		height: 55,
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		backgroundColor: '#f8f8f8',
		elevation: 8,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * 8 },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * 8,
	},
	line: {
		width: DeviceWidth - 20,
		margin: 20,
		height: 1,
		elevation: 8,
		backgroundColor: '#f5f5f5',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * 8 },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * 8,
	},
	button: {
		height: 55,
		width: DeviceWidth / 2,
		padding: 5,
		margin: 5,
		borderWidth: 2,
		borderRadius: 25,
		borderColor: '#f5f5f5',
		fontSize: 20,
		fontWeight: '600',
		backgroundColor: '#1b4e7d',
		color: '#f8f8f8',
		textAlign: 'center',
		textAlignVertical: 'center',
		elevation: 8,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * 8 },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * 8,
	},
	inputContainer: {
		flex: 4,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
	subInputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 5,
	},
	submit: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	container: {
		flex: 1,
	},
	headerContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerSubContainer: {
		width: DeviceWidth - 50,
		height: 60,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#f5f5f5',
		backgroundColor: '#f8f8f8',
		elevation: 8,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 0.5 * 8 },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		fontSize: 24,
		color: '#1b4e7d',
	},
	footerContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flex: 1,
	},
	avocado: {
		height: 70,
		width: 300,
	},
})