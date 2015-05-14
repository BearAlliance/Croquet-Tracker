<?php

include 'common/base.php';
session_start();
$response = array();
$response['success'] = false;

$newPass = $_POST['newPassword'];
$newPass2 = $_POST['newPassword2'];
$username = $_SESSION['username'];

if ($newPass != $newPass2) {
	$response['message'] = "Passwords do not match";
	echo json_encode($response);
	return;
}
else if ($username == null) {
	$response['message'] = "User is not properly authenticated";
	echo json_encode($response);
	return;
}
else {
	$newPassQuery = "UPDATE `users`
					SET `password` = '$newPass'
					WHERE `username` = '$username'";
	if ($result = mysqli_query($conn, $newPassQuery)) {
		$response['success'] = true;
		$response['message'] = "Password successfully changed";
	}
}

include 'common/close.php';
$response['test'] = $newPass;
echo json_encode($response);