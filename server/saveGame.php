<?php
include 'common/base.php';

$response				= array();	// Array to pass back results
$response['success'] 	= false; 	// Default success state

$player1 = $_SESSION['userId'];

if (empty($_POST['player2'])) {
	$response['message'] = "Must enter a second player";
	$response['error'] = "Must enter a second player";
}

if (empty($response['error'])) {
	$response['message'] = "Second player found";
	$response['success'] = true;
}

$p1Score = $_POST['p1Score'];
$p2Score = $_POST['p2Score'];

echo json_encode($response);