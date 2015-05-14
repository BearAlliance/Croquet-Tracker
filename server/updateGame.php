<?php
include 'common/base.php';
session_start();

$response = array();
$response['success'] = false;

$gameid = $_POST['gameid'];
$player2 = $_POST['player2'];
$player1score = $_POST['p1Score'];
$player2score = $_POST['p2Score'];

$updateQuery = "UPDATE `games` 
				SET `user1score` = '$player1score',
				`user2score` = '$player2score',
				`user2` = '$player2'
				WHERE `gameid` = '$gameid'";
if ($result = mysqli_query($conn, $updateQuery)) {
	$response['success'] = true;
}


include 'common/close.php';
echo json_encode($response);