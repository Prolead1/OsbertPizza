<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
            <h3 class="formheader"><strong>Log in to an existing account</strong></h3>
            <form id="loginform" method="post" action="login.php">
                <div class="forminput">
                    <label for="email">Email ID</label><br>
                    <input class="formtext" type="email" name="email" placeholder="someone@example.com" required>
                </div>
                <div class="forminput">
                    <label for="password">Password</label><br>
                    <input class="formtext" type="password" name="password" placeholder="Password" required>
                </div>
                <input type="button" class="bluebutton" value="Log in">
            </form>
            <p class="bottomtext">Don't have an account? <a class="bluelink" href="./register.php">Register here</a></p>
        </div>

    </div>

</body>
</html>