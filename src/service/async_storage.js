import AsyncStorage from '@react-native-async-storage/async-storage';

// Save to Local Storage String Value
export const storeStringData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		console.log(e);
	}
};

// Save to Local Storage Object Value
export const storeObjectData = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		console.log(e);
	}
};

// Get from Local Storage String Value
export const getStringData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return value;
		}
	} catch (e) {
		return '';
	}
};

// Get from Local Storage Object Value
export const getObjectData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		return {};
	}
};
