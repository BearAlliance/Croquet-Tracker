<?php
	include 'common/base.php'; // Server connection

	$userId = 0002;
	$newUser = "Nick";
	$newPass = "pass";
	$newEmail = "Nick@nick.com";
	//$dateCreated = "";

	echo $userID;


	// $sql = "INSERT INTO users(`userid`, `username`, `password`, `email`, `datecreated`) 
	// VALUES ('0002', '$newUser', '$newPass', '$newEmail', '$datecreated')";

	// if(mysqli_query($con, $sql)) {
	// 	echo "New User Created Successfully";
	// }
	// else {
	// 	echo "Error: " .$sql . "<br>" . msqli_error($conn);
	// }

	include 'common/close.php';
?> 