<?php
	$pageTitle = "CTrack";
  include "common/base.php";
	include "common/header.php";
?> 

<!-- Test for login -->


<!-- If logged in -->
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username']))
{
?>
	<div class="jumbotron">
      <div class="container">
        <h1>Hello!</h1>
        <p>Login sucessful. Content goes here</p>
      </div>
    </div>
	<?php
}


//<!-- If logged out -->
else
{
    ?>
    <div class="jumbotron">
      <div class="container">
        <h1>Welcome!</h1>
        <p>Croquet Tracker is an experimental Croquet game tracker. It lets you keep track of your deadness and game scores</p>
        <p><a class="btn btn-primary btn-lg" href="signup.php" role="button">Sign Up &raquo;</a></p>
      </div>
    </div>
    <?php
}
?>


<?php include_once ("common/footer.php"); ?>