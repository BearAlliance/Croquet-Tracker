<?php

$data				= array();	// Array to pass back results
$data['success'] 	= false; 	// Default success state
session_start();
if ($_SESSION["userId"]) {
	$data['success'] = true;
	$data['userId'] = $_SESSION["userId"];
	$data['username'] = $_SESSION["username"];
}
else {
	$data['message'] = "User not logged in";
}

echo json_encode($data);