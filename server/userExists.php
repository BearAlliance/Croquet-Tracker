<?php
	// userExists.php

	include 'common/base.php'; // Server connection

	$data = array(); // Array to pass back data
	$errors = array(); // Array to hold validation errors

	if (empty($_POST['username']))
		$errors['username'] = 'Username is required';
	else	
		$data['$username'] = $_POST["username"];
	
	if (empty(_$POST['email']))
		$errors['email'] = 'Email is required';
	else
		$data['email'] = $_POST['email'];

	// If there are errors
	if (! empty($errors)) { 
		$data['success'] = false;
		$data['errors'] = $errors;
	}
	// If there are no errors
	else {
		$data['success'] = true;
	}


	echo json_encode($data)

	// $sql = "SELECT username
	// 		FROM users
	// 		WHERE username = $user";

	// result = $con->query($sql);

	// if (! $result) {
	// 	echo "User exists";
	// }
	// else {
	// 	echo "User does not exist";
	// }

	include 'common/close.php';
?> 