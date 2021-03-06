function Restaurant() {


}

Restaurant.restaurants = [];
Restaurant.nameError = true, Restaurant.contactNameError = true, Restaurant.contactPhoneError = true,
Restaurant.cityError = true, Restaurant.zipCodeError = true, Restaurant.descriptionError = true,
Restaurant.countryError = true, Restaurant.stateError = true, Restaurant.addressLine1Error = true;

Restaurant.init = function () {
	$('#editRestaurantButton').hide();
	$('#restaurantCreateView').hide();
	$('#restaurantView').show();

	Parse.initialize(Config.PARSE_APP_ID);
	Parse.serverURL = Config.PARSE_SERVER_URL;
	const currentUser = Parse.User.current();

	RestaurantService.getRestaurantList();
	RestaurantService.loadCuisine();
	RestaurantService.loadServiceStyle();
	RestaurantService.loadAmbienceStyle();

	$('#addRestaurantIcon').click(Restaurant.clickAddRestaurantIcon);
	$('#deleteRestaurantButton').click(Restaurant.clickDeleteRestaurantIcon);
	$('#restaurantCreateViewBackButton').click(Restaurant.gotoRestaurantView);

	populateCountries('country', 'state');


	$('input').focus(function () {
		$(this).siblings('label').addClass('active');
	});

	$('input').blur(function () {
		// Restaurant Name
		if ($(this).hasClass('create-name')) {
			if ($(this).val().length == '') {
				$(this).siblings('span.error').text('Please type your restaurant name').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.nameError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.nameError = false;
			}
		}

		// Restaurant Description
		if ($(this).hasClass('create-description')) {
			if ($(this).val().length == '') {
				$(this).siblings('span.error').text('Please type your restaurant description').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.descriptionError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.descriptionError = false;
			}
		}


		// Restaurant Contact
		if ($(this).hasClass('create-addressline1')) {
			if ($(this).val().length == '') {
				$(this).siblings('span.error').text('Please type your restaurant address').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.addressLine1Error = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.addressLine1Error = false;
			}
		}

		if ($(this).hasClass('create-city')) {
			if ($(this).val().length == '') {
				$(this).siblings('span.error').text('Please type city of the restaurant').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.cityError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.cityError = false;
			}
		}

		if ($(this).hasClass('create-zipcode')) {
			if ($(this).val().length == '') {
				$(this).siblings('span.error').text('Please type zipcode of the restaurant').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.zipCodeError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.zipCodeError = false;
			}
		}

		if ($(this).hasClass('create-contactName')) {
			if ($(this).val().length == '') {
				$(this).siblings('span.error').text('Please type contact persons name').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.contactNameError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.contactNameError = false;
			}
		}

		if ($(this).hasClass('create-contactPhone')) {
			if ($(this).val().length == '') {
				$(this).siblings('span.error').text('Please type phone number').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.contactPhoneError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.contactPhoneError = false;
			}
		}


		// label effect
		if ($(this).val().length > 0) {
			$(this).siblings('label').addClass('active');
		} else {
			$(this).siblings('label').removeClass('active');
		}
	});


	$('select').blur(function () {
		// Restaurant Location - Country
		if ($(this).hasClass('create-country')) {
			if ($(this).val() == -1) {
				$(this).siblings('span.error').text('Please select the country').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.countryError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.countryError = false;
			}
		}

		// Restaurant Location - State
		if ($(this).hasClass('create-state')) {
			if ($(this).val() == -1) {
				$(this).siblings('span.error').text('Please select the state').fadeIn()
					.parent('.form-group')
					.addClass('hasError');
				Restaurant.stateError = true;
			} else {
				$(this).siblings('.error').text('').fadeOut()
					.parent('.form-group')
					.removeClass('hasError');
				Restaurant.stateError = false;
			}
		}
	});


	$('form.basic-form').submit((event) => {
		event.preventDefault();


		if (Restaurant.nameError == true || Restaurant.descriptionError == true || Restaurant.addressLine1Error == true || Restaurant.countryError == true || Restaurant.stateError == true
            || Restaurant.contactNameError == true || Restaurant.cityError == true || Restaurant.zipCodeError == true || Restaurant.contactPhoneError == true) {
			$('.create-name, .create-description, .create-contact, .create-country,.create-state,.create-addressline1,.label-icon,.create-zipcode,.create-city,.create-contactName,.create-contactPhone').blur();
		} else {
			const RestaurantBiz = Parse.Object.extend('RestaurantBiz');
			const restaurant = new RestaurantBiz();
			const id = $('#id').val();

			if (id) {
				restaurant.id = id;
			}

			const name = $('#name').val();
			const description = $('#description').val();
			const note = $('#note').val();
			const cuisine = $('#cuisineStyle').val();
			const ambience = $('#ambienceStyle').val();
			const service = $('#serviceStyle').val();

			restaurant.set('active', true);
			restaurant.set('name', name);
			restaurant.set('description', description);
			restaurant.set('note', note);
			restaurant.set('owner', { __type: 'Pointer', className: '_User', objectId: Parse.User.current().id });


			restaurant.set('cuisine', { __type: 'Pointer', className: 'WorldCuisine', objectId: cuisine });
			restaurant.set('serviceStyle', { __type: 'Pointer', className: 'RestaurantBizServiceStyle', objectId: service });
			restaurant.set('ambienceStyle', { __type: 'Pointer', className: 'RestaurantBizAmbienceStyle', objectId: ambience });

			const RestaurantBizContact = Parse.Object.extend('RestaurantBizContact');
			const restaurantBizContact = new RestaurantBizContact();
			const cId = $('#contactId').val();

			if (cId) {
				restaurantBizContact.id = cId;
			}

			const contactName = $('#contactName').val();
			const contactPhone = $('#contactPhone').val();
			const contactEmail = $('#contactEmail').val();


			restaurantBizContact.set('name', contactName);
			restaurantBizContact.set('phone', contactPhone);
			restaurantBizContact.set('email', contactEmail);
			//  var relation = restaurantBizContact.relation("restaurantBiz")
			// relation.add(restaurant);


			const RestaurantBizAddress = Parse.Object.extend('RestaurantBizAddress');
			const restaurantBizAddress = new RestaurantBizAddress();

			const aId = $('#addressId').val();

			if (aId) {
				restaurantBizAddress.id = aId;
			}

			const country = $('#country').val();
			const state = $('#state').val();
			const city = $('#city').val();
			const zipcode = $('#zipcode').val();
			const address = $('#addressline1').val();


			restaurantBizAddress.set('country', country);
			restaurantBizAddress.set('state', state);
			restaurantBizAddress.set('zipCode', zipcode);
			restaurantBizAddress.set('city', city);
			restaurantBizAddress.set('address', address);


			restaurant.set('contact', restaurantBizContact);
			restaurant.set('address', restaurantBizAddress);


			NProgress.start();
			restaurant.save(null).then(
				(res) => {
					console.log('saved');


					const restaurantFileUpload = $('#restaurantImage')[0];
					if (restaurantFileUpload.files.length > 0) {
						const file = restaurantFileUpload.files[0];
						const name = 'photo.jpg';
						const imageFile = new Parse.File(name, file);
						imageFile.save().then(() => {
							res.set('image', imageFile);
							res.save();
							setTimeout(() => { NProgress.done(); }, 100);
							RestaurantService.getRestaurantList();
							$('.empty').show();
							$('.form-peice').hide();
							$('#restaurantCreateView').hide();
							$('#restaurantView').show();
						}, (error) => {
							// The file either could not be read, or could not be saved to Parse.
						});
					} else {
						RestaurantService.getRestaurantList();
						$('.empty').show();
						$('.form-peice').hide();
						$('#restaurantCreateView').hide();
						$('#restaurantView').show();
					}
				},
				(error) => {
					console.log('error');
					$('.empty').show();
					$('.form-peice').hide();
					RestaurantService.getRestaurantList();
					$('#restaurantCreateView').hide();
					$('#restaurantView').show();
					setTimeout(() => { NProgress.done(); }, 100);
				},
			);
		}
	});
};
Restaurant.gotoRestaurantView = function (event) {
	event.preventDefault();
	$('#restaurantCreateView').hide();
	$('#restaurantView').show();
};

Restaurant.displayRestaurantList = function (results) {
	Restaurant.restaurants = [];

	let items = '';
	for (let i = 0; i < results.length; i++) {
		const restaurant = results[i];
		const { id } = restaurant;
		const name = restaurant.get('name');
		const description = restaurant.get('description');
		const note = restaurant.get('note');
		const cuisine = restaurant.get('cuisine').id;
		const ambienceStyle = restaurant.get('ambienceStyle').id;
		const serviceStyle = restaurant.get('serviceStyle').id;

		const active = restaurant.get('active');

		const country = restaurant.get('address').get('country');
		const state = restaurant.get('address').get('state');
		const zipcode = restaurant.get('address').get('zipCode');
		const city = restaurant.get('address').get('city');
		const address = restaurant.get('address').get('address');
		const addressId = restaurant.get('address').id;


		const contactId = restaurant.get('contact').id;
		const contactName = restaurant.get('contact').get('name');
		const phone = restaurant.get('contact').get('phone');
		const email = restaurant.get('contact').get('email');
		let imgUrl = '';
		if (restaurant.get('image') !== undefined) {
			imgUrl = restaurant.get('image').url();
		} else {
			imgUrl = localStorage.getItem('defaultRestaurantImageUrl');
		}

		Restaurant.restaurants.push(restaurant);
		let checked = '';
		if (active) {
			checked = 'checked';
		} else {
			checked = '';
		}


		items += `${'<li class="list-group-item"'
            + '"> <label class="switch pull-right"><input type="checkbox" class="restaurant-active" data-id='}${id}   ${checked}>  <span class="slider round"></span> </label>`
            + `<div class="resImage"><img src="${imgUrl}" width="100px" height="100px"+/></div>`
            + `<div class="restaurantName">${name}</div>`
            + `<div>${address}</div>`
            + `<div>${city} ${state} ${zipcode} ` + '</div>'
            + `<div>${country}</div>`
            + '<div> <p>' + ' ' + '</p></div>'
            + `<div>${contactName}</div>`
            + `<div>${email}</div>`
            + `<div>${phone}</div>`
            + '<div class="action-items-restaurant">'
            + `<a href="" rel="tooltip" title="Orders" data-id=${id}>`
            + '<i class="fas fa-book fa-lg" ></i>'
            + `</a><a href="" rel="tooltip" title="Menu" data-id=${id}>`
            + '<i class="fas fa-utensils fa-lg" ></i>'
            + `</a><a href="" rel="tooltip" title="Workers" data-id=${id}>`
            + '<i class="fas fa-users-cog fa-lg" ></i>'
            + `</a><a href="" rel="tooltip" title="Edit" data-id=${id}>`
            + '<i class="fas fa-edit fa-lg" ></i>'
            + `</a> <a href=""  rel="tooltip" title="Delete" data-id=${id}>`
            + '<i class="fa fa-trash fa-lg" ></i></a>'
            + '</div>'
            + '</li>';
	}
	$('#restaurantList').empty();
	$('#restaurantList').append(items);
	$('.restaurant-active').change(Restaurant.onChangeCheckBox);
	$('#restaurants .action-items-restaurant a').click(Restaurant.selectOption);
};

Restaurant.onChangeCheckBox = function () {
	const id = $(this).attr('data-id');
	const restaurant = Restaurant.getSelectedRestaurant(id);
	if (!$(this).is(':checked')) {
		RestaurantService.updateRestaurantState(restaurant, false);
	} else {
		RestaurantService.updateRestaurantState(restaurant, true);
	}
};


Restaurant.displayCuisine = function (results) {
	let items = '';
	for (let i = 0; i < results.length; i++) {
		const object = results[i];
		const { id } = object;

		const name = object.get('name');
		const display = object.get('display');

		items += `<option  value=${id} data-name=${name
		}>${display}</option>`;
	}
	$('#cuisineStyle').empty();
	$('#cuisineStyle').append(items);
};

Restaurant.displayServiceStyle = function (results) {
	let items = '';
	for (let i = 0; i < results.length; i++) {
		const object = results[i];
		const { id } = object;

		const name = object.get('name');
		const display = object.get('display');

		items += `<option  value=${id} data-name=${name
		}>${display}</option>`;
	}
	$('#serviceStyle').empty();
	$('#serviceStyle').append(items);
};

Restaurant.displayAmbienceStyle = function (results) {
	let items = '';
	for (let i = 0; i < results.length; i++) {
		const object = results[i];
		const { id } = object;

		const name = object.get('name');
		const display = object.get('display');

		items += `<option  value=${id} data-name=${name
		}>${display}</option>`;
	}
	$('#ambienceStyle').empty();
	$('#ambienceStyle').append(items);
};

Restaurant.clickAddRestaurantIcon = function (event) {
	event.preventDefault();
	$('#restaurantView').hide();
	$('#restaurantCreateView').show();
	$('#name,#description,#note,#zipcode,#city,#addressline1,#addressline2,#contactName,#contactPhone,#contactEmail').siblings('label').removeClass('active');
	$('#name,#description,#note,#zipcode,#city,#addressline1,#addressline2,#contactName,#contactPhone,#contactEmail').val('');
	$('#country').val(-1);
	$('#state').val(-1);
	$('#id').val('');
	$('#contactId').val('');
	$('#addressId').val('');
	$('.empty').hide();
	$('.form-peice').show();
	Restaurant.nameError = true, Restaurant.contactNameError = true, Restaurant.contactPhoneError = true,
	Restaurant.cityError = true, Restaurant.zipCodeError = true, Restaurant.descriptionError = true,
	Restaurant.countryError = true, Restaurant.stateError = true, Restaurant.addressLine1Error = true;
	$('#createRestaurantButton').show();
	$('#editRestaurantButton').hide();
};

Restaurant.selectOption = function (e) {
	e.preventDefault();
	const title = $(this).attr('title');
	const id = $(this).attr('data-id');

	if (title == 'Edit') {
		Restaurant.selectRestaurant(id);
	}
	if (title == 'Workers') {
		Restaurant.selectWorkers(id);
	}
	if (title == 'Menu') {
		Restaurant.selectMenu(id);
	}
	if (title == 'Orders') {
		swal('Function not implemented');
	}
	if (title == 'Delete') {
		Restaurant.destroyRestaurant(id);
	}
};

Restaurant.destroyRestaurant = function (id) {
	swal({
		title: 'Are you sure?',
		text: '',
		icon: 'warning',
		buttons: true,
		dangerMode: true,
	})
		.then((willDelete) => {
			if (willDelete) {
				RestaurantService.destroyRestaurant(Restaurant.getSelectedRestaurant(id));
			} else {

			}
		});
};

Restaurant.selectMenu = function (id) {
	console.log('Restaurant.selectMenu');
	const restaurant = Restaurant.getSelectedRestaurant(id);
	Menu.init(restaurant);
};

Restaurant.selectWorkers = function (id) {
	const restaurant = Restaurant.getSelectedRestaurant(id);
	selectMainTabById('workers');
	$('#restaurantView').hide();
	Worker.init(restaurant);
};


Restaurant.selectRestaurant = function (id) {
	const restaurant = Restaurant.getSelectedRestaurant(id);
	$('#restaurantView').hide();
	$('#restaurantCreateView').show();
	$('.form-peice').show();
	$('.empty').hide();

	$('#createRestaurantButton').hide();
	$('#editRestaurantButton').show();
	// Fill item details
	$('#id').val(restaurant.id);
	$('#contactId').val(restaurant.get('contact').id);
	$('#addressId').val(restaurant.get('address').id);
	$('#name').focus();
	$('#name').val(restaurant.get('name'));
	$('#description').focus();
	$('#description').val(restaurant.get('description'));
	$('#note').focus();
	$('#note').val(restaurant.get('note'));
	$('#cuisineStyle').focus();
	$('#cuisineStyle').val(restaurant.get('cuisine').id);
	$('#ambienceStyle').focus();
	$('#ambienceStyle').val(restaurant.get('ambienceStyle').id);
	$('#serviceStyle').focus();
	$('#serviceStyle').val(restaurant.get('serviceStyle').id);

	const activeCheckBox = $('#retaurantActive');
	const restaurantStatus = restaurant.get('active');
	const isTrueSet = (restaurantStatus === 'true');
	if (isTrueSet) {
		activeCheckBox.prop('checked', true);
	} else {
		activeCheckBox.prop('checked', false);
	}

	$('#country').focus();
	$('#country').val(restaurant.get('address').get('country'));
	$('#country').change();
	$('#state').focus();
	$('#state').val(restaurant.get('address').get('state'));
	$('#zipcode').focus();
	$('#zipcode').val(restaurant.get('address').get('zipCode'));
	$('#city').focus();
	$('#city').val(restaurant.get('address').get('city'));
	$('#addressline1').focus();
	$('#addressline1').val(restaurant.get('address').get('address'));


	$('#contactName').focus();
	$('#contactName').val(restaurant.get('contact').get('name'));
	$('#contactPhone').focus();
	$('#contactPhone').val(restaurant.get('contact').get('phone'));

	$('#contactEmail').focus();
	$('#contactEmail').val(restaurant.get('contact').get('email'));
};


Restaurant.getSelectedRestaurant = function (id) {
	for (let i = 0; i < Restaurant.restaurants.length; i++) {
		const restaurant = Restaurant.restaurants[i];
		if (restaurant.id == id) {
			return restaurant;
		}
	}
};
