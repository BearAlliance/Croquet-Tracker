<?php

include 'common/base.php';

	$db				= "users";		// Selects the users table
	$errors         = array();  	// array to hold validation errors
	$data 			= array(); 	
	
	$query = "SELECT username FROM users";
	$result = msql_query($query);
	$data['test'] = result;

	return json_encode($data);
include 'common/close.php';