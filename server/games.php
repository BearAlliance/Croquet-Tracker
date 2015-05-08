<?php
include 'common/base.php';

$response				= array();	// Array to pass back results
$response['success'] 	= false; 	// Default success state

// If the user is not logged in
// if (!$_SESSION['userId']) {
// 	$response['message'] = "User not logged in";
// 	json_encode($response);
// 	return;
// }
// else {
// 	$username = $_SESSION['username'];
// 	$userId = $_SESSION['userId'];
// }

$userId = "17";

// $gamesQuery = 	"SELECT `gameid`, `player1`, `player2` FROM `games` WHERE `user2` = '$userId'";
// if ($result = mysqli_query($conn, $gamesQuery)) {
// 	$response['games'] = $result;
// 	$response['success'] = true;
// 	$rows = array();
// 	while($r = mysqli_fetch_assoc($result)) {
// 		$rows[] = $r;
// 	}
// }
$response['test'] = "test";
$response['message'] = "test2";
json_encode($response);