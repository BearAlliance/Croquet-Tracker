<?php
include 'common/base.php';

$data		= array();	// Array to pass back results
$data['success'] = false;

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
if (empty($data)) {
	$signInQuery = "SELECT `username`, `password` FROM `users` WHERE `username` = '$username'";
	if ($result = mysqli_query($conn, $SignInQuery)) {
		if (mysqli_num_rows($result) < 1) {
			$data['success'] = false;
			$data['message'] = "Username not found";
		}
		else {
			$user = mysqli_fetch_object($result);
			if ($user->username == $username && $user->password == $password) {
				$data['success'] = true;
				$_SESSION['user'] = $user->userid;
			}
		}
	}
	else {
		$data['success'] = false;
		$data['message'] = "Error talking to database";
	}

}
// Return $data back to http
echo json_encode($data);
