<?php

include 'common/base.php';
$response = array();
$response['success'] = false;

$gameid = $_POST['id'];

$deleteQuery = "DELETE FROM `games` WHERE `gameid` = '$gameid'";

if ($result = mysqli_query($conn, $deleteQuery)) {
	$response['success'] = true;
}

$response['test'] = $_POST['id'];
include 'common/close.php';

echo json_encode($response);