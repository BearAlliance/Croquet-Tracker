<?php
$pageTitle = "Register";
include "common/base.php";
include "common/header.php";
?><br><br><?php

//If there is input from the previous page
if(!empty($_POST['username']) && !empty($_POST['password']))
{
    $username = mysql_real_escape_string($_POST['username']);
    $password = md5(mysql_real_escape_string($_POST['password']));
    $email = mysql_real_escape_string($_POST['email']);
     
     $checkusername = mysql_query("SELECT * FROM users WHERE Username = '".$username."'");
      
     if(mysql_num_rows($checkusername) == 1)
     {
     ?>
        <div class="jumbotron">
          <h1>Shucks!</h1>
          <p>That username is already taken./p>
          <p><a class="btn btn-primary btn-lg" href="signup.php" role="button">Try Again</a></p>
        </div>
     <?php
     }
     else
     {
        $registerquery = mysql_query("INSERT INTO users (Username, Password, EmailAddress) VALUES('".$username."', '".$password."', '".$email."')");
        if($registerquery)
        {
        ?>
            <div class="jumbotron">
              <h1>Nice!</h1>
              <p>You've sucessfully signed up.</p>
              <p><a class="btn btn-primary btn-lg" href="index.php" role="button">Login</a></p>
            </div>
        <?php
        }
        else
        {
            echo "<h1>Error</h1>";
            echo "<p>Sorry, your registration failed. Please go back and try again.</p>";   
        }      
     }
}
// Sign up form
else 
{
?>

    <h2>Sign up</h2>
    <form method="post" action="signup.php" id="registerform" class="form-horizontal" role="form">
        <div class="form-group">
            <label class="control-label col-sm-2" for="username">Username:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="username" id="username" placeholder="Enter Username" />
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="email">Email:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="email" id="email" placeholder="Enter Email" />
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="password">Password:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="password" id="password" placeholder="Enter Password" />
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="password">Password:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="password" id="password" placeholder="Re-enter Password" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-default">Sign Up!</button>
            </div>
          </div>
    </form>
    <?php
}
include "common/footer.php";
?>