<?php
include 'common/base.php';

$db				= "users"; 		// Selects the users table
$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data
// validate the variables ======================================================
	if (empty($_POST['username'])) {
		$errors['name'] = 'Name is required.';
	}
	else {
		$username = $_POST['username'];
	}
	if (empty($_POST['email'])) {
		$errors['email'] = 'Email is required.';
	}
	else {
		$email = $_POST['email'];
	}

	// response if there are errors
	if ( ! empty($errors['email']) || ! empty($errors['username'])) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
	} 
	else {
		// $query = "SELECT email FROM users WHERE username = 'Nick";
		// $result = msql_query($query);
		// $data['test'] = result;
		// if (msql_fetch_array($result) = $username); {
		// 	$duplicateUser = true;
		// }

		// if there are no errors, return a message
		$data['success'] = true;
		$data['message'] = 'Success!';
		//include 'common/close.php';
	}
	// return all our data to an AJAX call
	echo json_encode($data);