<?php

$dbname = "ctrack";
$servername = "localhost";
$username = "server";
$password = "password";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
