import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantEntry } from '../../model/restaurant-entry';
import { EventEntry } from '../../model/event-entry';
import { ProfileEntry } from '../../model/profile-entry';

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCGbFHLdOQ4gtG8X62d8926qSwFazII0K8",
    authDomain: "si669final.firebaseapp.com",
    databaseURL: "https://si669final.firebaseio.com",
    projectId: "si669final",
    storageBucket: "",
    messagingSenderId: "415154827824"
}; 

@Injectable()
export class DataProvider {

	private db: any;

	private profileEntries: ProfileEntry[] = [];
	private koreanRestaurantEntries: RestaurantEntry[] = [];
	private chineseRestaurantEntries: RestaurantEntry[] = [];
	private mexicanRestaurantEntries: RestaurantEntry[] = [];
	private indianRestaurantEntries: RestaurantEntry[] = [];

	private eventEntries: EventEntry[] = [];

	constructor(public http: HttpClient) {
		console.log('Hello DataProvider Provider');

		firebase.initializeApp(firebaseConfig);
	    this.db = firebase.database();
	}

	loadData(){
		this.loadDummyRestaurantEntries();
		this.loadDummyProfileEntries();	
		this.loadDummyEventEntries();	
	}

	loadDummyRestaurantEntries(){
		
		// Korean RestaurantEntry

		this.http.get("../../assets/data/korean.json").subscribe(data => {
			for (let restaurant of data['restaurants']){
				this.koreanRestaurantEntries.push(restaurant)
			}
			console.log(this.koreanRestaurantEntries);

			let restaurantRef = this.db.ref('/restaurants/korean');

			for (let restaurant of this.koreanRestaurantEntries){
				restaurantRef.child(restaurant.id).set(restaurant);
			}
		});


		// Chinese Restaurant

		this.http.get("../../assets/data/chinese.json").subscribe(data => {
			for (let restaurant of data['restaurants']){
				this.chineseRestaurantEntries.push(restaurant)
			}
			console.log(this.chineseRestaurantEntries);

			let chineseRestaurantRef = this.db.ref('/restaurants/chinese');

			for (let restaurant of this.chineseRestaurantEntries){
				chineseRestaurantRef.child(restaurant.id).set(restaurant);
			}
		});


		// Mexican Restaurants

		this.http.get("../../assets/data/mexican.json").subscribe(data => {
			for (let restaurant of data['restaurants']){
				this.mexicanRestaurantEntries.push(restaurant)
			}
			console.log(this.mexicanRestaurantEntries);

			let restaurantRef = this.db.ref('/restaurants/mexican');

			for (let restaurant of this.mexicanRestaurantEntries){
				restaurantRef.child(restaurant.id).set(restaurant);
			}
		});


		// Indian Restaurants

		this.http.get("../../assets/data/indian.json").subscribe(data => {
			for (let restaurant of data['restaurants']){
				this.indianRestaurantEntries.push(restaurant)
			}
			console.log(this.indianRestaurantEntries);

			let restaurantRef = this.db.ref('/restaurants/indian');

			for (let restaurant of this.indianRestaurantEntries){
				restaurantRef.child(restaurant.id).set(restaurant);
			}
		});
	}

	loadDummyProfileEntries(){
		this.http.get("../../assets/data/profiles.json").subscribe(data =>{
			for (let profile of data['profiles']){
				this.profileEntries.push(profile)
			}
			console.log(this.profileEntries);


			let profileRef = this.db.ref('/profiles');

			for (let profile of this.profileEntries){
				profileRef.child(profile.username).set(profile);
			}
		});
	}

	loadDummyEventEntries(){
		this.http.get("../../assets/data/events.json").subscribe(data => {
			for (let event of data['events']){
				this.eventEntries.push(event)
			}
			console.log(this.eventEntries);

			let eventRef = this.db.ref('/events');

			for (let event of this.eventEntries){
				eventRef.child(event.id).set(event);
			}
		})
	}

}
