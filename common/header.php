<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $pageTitle ?></title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="./index.php">Croquet Tracker</a>
        </div>

        <!-- If logged in -->
        <?php
        if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username']))
        {
          ?>
          <div id="navbar" class="navbar-collapse collapse">
            <a href="./logout.php">
            <button type="button" class="btn btn-default navbar-btn">Log Out</button>
            </a> 
            <a href="./account.php" class="button">
            <button type="button" class="btn btn-default navbar-btn">Your Account</button>
            </a>
          </div>
          <?php 
        }
          
        // <!-- If logged out -->
        else
        {
          ?>
          <div id="navbar" class="navbar-collapse collapse">
            <form action="login.php" method="post" class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" placeholder="User Name" name="username" class="form-control" >
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" name="password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success navbar-btn">Sign in</button>
            </form>
          </div>
            <?php
        } 
        ?>
        </nav>
        </div><!--/.navbar-collapse -->
      </div><!-- /container -->
      <br><br><br>
    <!-- </nav> -->