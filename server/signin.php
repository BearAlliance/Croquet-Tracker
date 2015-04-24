<?php
include 'common/base.php';

$data				= array();	// Array to pass back results
$data['success'] 	= false; 	// Default success state

// Check for empty fields
// Inserts error message into $data if there are
if (empty($_POST['username'])) {
	$data['message'] = "Username is required";
}
else {
	$username = $_POST['username'];
}
if (empty($_POST['password'])) {
	$data['message'] = "Password is required";
}
else {
	$password = $_POST['password'];
}
// If there were no empty fields
if (!$data['message']) {
	// Attempt to find the user in the database
	$signInQuery = "SELECT `username`, `password` FROM `users` WHERE `username` = '$username'";
	if ($result = mysqli_query($conn, $signInQuery)) {
		// If the user is found
		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_object($result);
			// Check if the username and password match
			if ($user->username === $username && $user->password === $password) {
				$data['success'] = true;
				$data['message'] = "Successfully logged in!";
				session_start();
				$_SESSION['userId'] = $user->userid;
			}
			// Incorrect Password
			else {
				$data['message'] = "Username and Password don't match";
			}
		}
		// If the username is not found
		else {
			$data['message'] = "Username not found";
		}
	}
	else {

		$data['message'] = "Error talking to database";
	}

}
// Return $data back to http
//$data['success'] = true;
echo json_encode($data);
