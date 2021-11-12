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
<?php
    require "./php/helpers.php";
    $failed = "";

    if(isset($_COOKIE["loginstatus"])) {
        if ($_COOKIE["loginstatus"] == "True"){
            header('Location: ./menu.php');
            die();
        }
        elseif ($_COOKIE["loginstatus"] == "Failed"){
            $failed = "Login failed, invalid credentials";
            setcookie("loginstatus","", time()+ 86400);
        }elseif ($_COOKIE["loginstatus"] == "Username"){
            $failed = "Invalid email entered, please try again with a valid email";
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
            <h3 class="formheader"><strong>Log in to an existing account</strong></h3>
            <p class="bluelink"><?php echo $failed ?></p> 
            <form id="loginform" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
                <div class="forminput">
                    <label for="username">Email ID</label><br>
                    <input class="formtext" type="email" name="username" placeholder="someone@example.com" required>
                </div>
                <div class="forminput">
                    <label for="password">Password</label><br>
                    <input class="formtext" type="password" name="password" placeholder="Password" required>
                </div>
                <input type="submit" class="bluebutton" value="Log in">
            </form>
            <p class="bottomtext">Don't have an account? <a class="bluelink" href="./register.php">Register here</a></p>
        </div>

    </div>
<?php
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // collect value of input field
        $username = strtolower(htmlspecialchars($_POST["username"]));
        $password = htmlspecialchars($_POST["password"]);
        if (checkusername($username)){
            $data = getdata("SELECT * FROM logins WHERE username='".$username."'");
            $row = data_parse($data);
            $row = (array)$row[0];
            $password = (string)$row["password"];
            if ($row['password'] == $password){
                setcookie("loginstatus", "True", time() + 86400);
                setcookie("loginuname", $username, time() + 86400);
                header('Location: ./menu.php');
                die();
            }
            else{
                setcookie("loginstatus", "Failed", time() + 86400);
                var_dump($row);
                header('Location: ./login.php');
                die();
            }
        }else{
            setcookie("loginstatus", "Username", time() + 86400);
            header('Location: ./login.php');
            die();
        }
}
?>
</body>
</html>