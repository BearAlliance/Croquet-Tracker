<?php

include 'common/base.php';

	$errors         = array();  	// array to hold validation errors
	$data 			= array(); 	

	echo "hello";	

	$sql = "INSERT INTO users (username, email, password)
	VALUES ('John', 'Doe@gmail.com', 'password')";

	if (mysqli_query($conn, $sql)) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}

	echo $result;
	echo $data['test'];
	echo $data['result'];