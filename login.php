<?php
$pagetitle = "Login";
include "common/base.php";
include "common/header.php";

// If there is post input from the previous page
if(!empty($_POST['username']) && !empty($_POST['password']))
{
    $username = mysql_real_escape_string($_POST['username']);
    $password = md5(mysql_real_escape_string($_POST['password']));
     
    $checklogin = mysql_query("SELECT * FROM users WHERE Username = '".$username."' AND Password = '".$password."'");
     
    if(mysql_num_rows($checklogin) == 1)
    {
        $row = mysql_fetch_array($checklogin);
        $email = $row['EmailAddress'];
         
        $_SESSION['Username'] = $username;
        $_SESSION['EmailAddress'] = $email;
        $_SESSION['LoggedIn'] = 1;
         
        echo "<h1>Success</h1>";
        echo "<p>Now Redirecting</p>";
        echo "<meta http-equiv='refresh' content='=2;index.php' />";
    }
    else
    {
        echo "<h1>Error</h1>";
        echo "<p>Sorry, your account could not be found. Please <a href=\"index.php\">click here to try again</a>.</p>";
    }
}
// If there is no input
else
{
?>
    <div class="col-sm-4">
        <h2>Login</h2>
        <form action="login.php" method="post"class="form-horizontal" role="form">
        <div class="input-group">
          <input type="text" class="form-control" name= "username" placeholder="Username" aria-describedby="basic-addon2">
        </div>
        <div class="input-group">
          <input type="text" class="form-control" name= "password" placeholder="Password" aria-describedby="basic-addon2">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
<?php
}
include "common/footer.php";
?>