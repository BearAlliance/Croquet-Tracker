<?php

include 'common/base.php';

$response = array();
$response['success'] = false;

$player1 = $_POST['player1'];
$player2 = $_POST['player2'];
$player1score = $_POST['p1Score'];
$player2score = $_POST['p2Score'];

$newGameQuery = "INSERT INTO games (user1, user2, user1score, user2score)
				VALUES ('$player1', '$player2', '$player1score', '$player2score')";

if ($result = mysqli_query($conn, $newGameQuery)) {
	$response['success'] = true;
}

$response['test'] = $player1;

echo json_encode($response);