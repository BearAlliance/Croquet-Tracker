<?php
include 'common/base.php';

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
	$password = $_POST['password'];

	// Response if there are empty fields
	if ( ! empty($errors['email']) || ! empty($errors['username'])) {
		// if there are items in the errors array, return those errors
		$data['success'] = false;
		$data['message'] = "Did you forget to enter your username or email?";
	} 
	else {
		$userExists = existingUser($conn, $username);
		$emailExists = existingEmail($conn, $email);
		if ($userExists) {
			$data['success'] = false;
			$errors['existingUser'] = "The username already exists";
			$data['message'] = "That username is alreay taken";
		}
		else if ($emailExists) {
			$data['success'] = false;
			$errors['existingEmail'] = "This email address is already in use";
			$data['message'] = "This email address is already in use";
		}
		else if (!$userExists && !$emailExists) {
			if (insertUser($conn, $username, $email, $password)) {
				$data['success'] = true;
			$data['message'] = "Account sucessfully created!";
			}
			else {
				$data['success'] = false;
				$errors['newUser'] = "There was a problem creating your account";
				$data['message'] = "There was a problem creating your account";
			}

		}
	}
	// return all data to an AJAX call
	if (!Empty($errors)) {
		$data['errors'] = $errors;
	}
	$data['test'] = existingUser($conn, $username);
	echo json_encode($data);
		
// Checks if there is already a user with that name
// Returns true if there is an existing user
function existingUser($conn, $username) 
{
	$query = "SELECT * FROM `users` WHERE `username` = '$username'";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		return true;
	}
	return false;
}

// Checks for existing email address
// Returns true if the email address is already in use
function existingEmail($conn, $email) 
{
	$query = "SELECT * FROM `users` WHERE `email` = '$email'";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		return true;
	}
	return false;
}

// Creates a new user row
// Returns true if successful
function insertUser($conn, $username, $email, $password)
{
	// Insert the new user into `users`
	$newUserQuery = "INSERT INTO users (username, email, password)
	VALUES ('$username', '$email', '$password')";
	if (mysqli_query($conn, $newUserQuery)) {
		return true;
	}
		return false;
}