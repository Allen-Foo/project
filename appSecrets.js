const appSecrets = {
	auth0:{
		domain: `reggie3.auth0.com`,
		clientID: `exewwRgiyRaD39xuBb0ENd7agmXNUT1Z`,
		connection: `TouryStory-Users`
	},
	google: {
		clientID: `495388686744-lr79ihd19uff4vgfob3f0jqftu6i1f6q.apps.googleusercontent.com`,
		mapsAPIKey: `AIzaSyCo08fvBzBmi2r6oTHzTk940Ak74mSPyck`,
		oauth: {
			android: `866395199918-0skioqnpum1q60a03iq9vv6hk0913u7q.apps.googleusercontent.com`,
			ios: `866395199918-l1g6li4ih06klfi88nab4cuk7r4g1ldr.apps.googleusercontent.com`
		}
	},
	facebook: {
		clientID: `133515140682972`
	},
	twitter: {
		clientID: `YzdixNvS1QPdsakaywxlKLu84`
	},
	aws: {
		// apiURL: `https://7n1u0nexpd.execute-api.us-east-1.amazonaws.com/dev/users/create`
		apiURL: "https://reaf1dgnga.execute-api.us-east-1.amazonaws.com/dev"
	}
};

export default appSecrets;

