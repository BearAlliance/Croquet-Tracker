<?php 
include "common/base.php"; 
include "common/header.php";
$_SESSION = array(); // Reset the session
session_destroy(); 	// Destroy the session
?>

<meta http-equiv="refresh" content="0; index.php">
<?php
include "common/footer.php";
?>