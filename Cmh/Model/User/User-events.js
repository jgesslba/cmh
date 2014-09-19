

model.User.fullName.onGet = function() {
	// Initialize variable
	var nameParts = 0;
	
	// Check firstName
	nameParts = (this.firstName != null && this.firstName != '') ? nameParts + 1 : nameParts;

	// Check lastName
	nameParts = (this.lastName != null && this.lastName != '') ? nameParts + 2 : nameParts;
	
	// Calculate fullName
	switch(nameParts) {
		case 1:
			return this.firstName;
			break;
		case 2:
			return this.lastName;
			break;
		case 3:
			return this.firstName + ' ' + this.lastName;
			break;
		default:
			return 'No name';
			break;
			
	}
};


model.User.photo.events.onRemove = function() {
	// Add default avatar
	//if (this.gender == 'm')
		this.photo = loadImage(ds.getModelFolder().path + 'WebFolder/images/avatars/dummy1.png');
	//else if (this.gender == 'w')
	//	this.photo = loadImage(ds.getModelFolder().path + 'WebFolder/images/avatars/User_Doctor_Female_256.png');
	//else
	//	this.photo = loadImage(ds.getModelFolder().path + 'WebFolder/images/avatars/Group_Doctors_256.png');
		
	// Set as avatar photo
	this.avatarPhoto = true;	
};



model.User.events.onSave = function() {
	// Add default avatar
	if (this.photo == null || this.avatarPhoto == true) {
		//if (this.gender == 'm')
			this.photo = loadImage(ds.getModelFolder().path + 'WebFolder/images/avatars/dummy1.png');
		//else if (this.gender == 'w')
		//	this.photo = loadImage(ds.getModelFolder().path + 'WebFolder/images/avatars/User_Doctor_Female_256.png');
		//else
		//	this.photo = loadImage(ds.getModelFolder().path + 'WebFolder/images/avatars/Group_Doctors_256.png');
			
		// Set as avatar photo
		this.avatarPhoto = true;
	} else
		this.avatarPhoto = false;
};


model.User.events.onRestrictingQuery = function() {
	// Create empty user entity colleciton;
	var resultCollection = ds.User.createEntityCollection();
	
	// Get role of the user
	var session = currentSession();
	if (session.belongsTo('Admin') || session.belongsTo('Gamehost'))
		resultCollection = ds.User.all(); // Admin user gets all entities
		
	// Result
	return resultCollection;
};
