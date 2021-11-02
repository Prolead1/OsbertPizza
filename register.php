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
<?php
    $failed = "";
    if(isset($_COOKIE["loginstatus"])) {
        if ($_COOKIE["loginstatus"] == "True"){
            header('Location: ./menu.php');
            die();
        }
        elseif ($_COOKIE["loginstatus"] == "Failed"){
            $failed = "Passwords don't match. Try again.";
            setcookie("loginstatus","", time()+ 86400);
        } elseif ($_COOKIE["loginstatus"] == "Exists"){
            $failed = "<a href='login.php' class='bluelink' style='font-size:12px;'>An account already exists with this username. Login instead.</a>";
            setcookie("loginstatus","", time()+ 86400);
        }
    }
?>
    <nav class="navbar">
        <div class="logo">
            <a href="./hero.html"><img id="logo" src="assets\Osbert Pizza-logos_white.png"></a>
        </div>
    </nav>
    <div class="login">
        <div class="loginbox">
            <p class="bottomtext alignleft"><a class="bluelink" href="./hero.html">&#10094; Back to home</a></p>
            <h3 class="formheader"><strong>Register for a new account</strong></h3>
            <p class="bluelink"><?php echo $failed ?></p> 
            <form id="loginform" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
                <div class="forminput">
                    <label for="username">Email ID</label><br>
                    <input class="formtext" type="email" name="username" placeholder="someone@example.com" required>
                </div>
                <div class="forminput">
                    <label for="password">New Password</label><br>
                    <input class="formtext" type="password" name="password1" placeholder="New Password" required>
                </div>
                <div class="forminput">
                    <label for="password">Confirm Password</label><br>
                    <input class="formtext" type="password" name="password2" placeholder="Confirm Password" required>
                </div>
                <input type="submit" class="bluebutton" value="Register">
            </form>
            <p class="bottomtext">Already have an account? <a class="bluelink" href="./login.php">Log in</a></p>
        </div>

    </div>
<?php
    require "./php/helpers.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // collect value of input field
        $username = strtolower(htmlspecialchars($_POST["username"]));
        $password1 = htmlspecialchars($_POST["password1"]);
        $password2 = htmlspecialchars($_POST["password2"]);
        
        if (strlen(getdata('SELECT * FROM logins WHERE username="'.$username.'"')) < 20){
            if ($password1 == $password2) {
                dbinsert('INSERT INTO logins VALUES (NULL, "'.$username.'", "'.$password1.'")');
                setcookie("loginstatus", "True", time() + 86400);
                setcookie("loginuname", $username, time() + 86400);
                header('Location: ./menu.php');
                die();
            } else {
                setcookie("loginstatus", "Failed", time() + 86400);
                header('Location: ./register.php');
                die();
            }
        } else {
            setcookie("loginstatus", "Exists", time() + 86400);
            header('Location: ./register.php');
            die();
        }

    }
?>
</body>
</html>