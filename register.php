<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image" href="./assets/favicon.ico">
</head>
<body>
    <nav class="navbar">
        <div class="logo">
            <a href="./hero.html"><img id="logo" src="assets\Osbert Pizza-logos_white.png"></a>
        </div>
    </nav>
    <div class="login">
        <div class="loginbox">
            <p class="bottomtext alignleft"><a class="bluelink" href="./hero.html">&#10094; Back to home</a></p>
            <h3 class="formheader"><strong>Register for a new account</strong></h3>
            <form id="loginform" method="post" action="login.php">
                <div class="forminput">
                    <label for="email">Email ID</label><br>
                    <input class="formtext" type="email" name="email" placeholder="someone@example.com" required>
                </div>
                <div class="forminput">
                    <label for="password">New Password</label><br>
                    <input class="formtext" type="password" name="password" placeholder="New Password" required>
                </div>
                <div class="forminput">
                    <label for="password">Confirm Password</label><br>
                    <input class="formtext" type="password" name="password" placeholder="Confirm Password" required>
                </div>
                <input type="button" class="bluebutton" value="Log in">
            </form>
            <p class="bottomtext">Already have an account? <a class="bluelink" href="./login.php">Log in</a></p>
        </div>

    </div>

</body>
</html>