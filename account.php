<?php
include "common/base.php";
include "common/header.php";

?>
<h1> Account page </h1>
<?php

	// If logged in
    if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username']))
    {
      ?>
    	<p> You are currently logged in
      <?php
     }
     else
     {
     	?>
     	<meta http-equiv="refresh" content="0; login.php">
     	<?php
     }
include "common/footer.php";
?>