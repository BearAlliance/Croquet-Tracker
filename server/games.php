<?php
include 'common/base.php';

$response				= array();	// Array to pass back results
$response['success'] 	= false; 	// Default success state
$data = array();
session_start();

// If the user is not logged in
if (!$_SESSION['userId']) {
	$response['message'] = "User not logged in";
	json_encode($response);
	return;
}
else {
	$username = $_SESSION['username'];
	$userId = $_SESSION['userId'];
}


$gamesQuery = 	"SELECT * FROM `games` WHERE `user2` = '$username' OR `user1` = '$username'";
if ($result = mysqli_query($conn, $gamesQuery)) {
	$response['games'] = $result;
	$response['success'] = true;
	$rows = array();
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
	}
	//$response['games'] = $rows;
}

echo json_encode($rows);