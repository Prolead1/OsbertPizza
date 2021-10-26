<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image" href="./assets/favicon.ico">
</head>
<body>
    <nav class="navbar">
        <div class="logo">
            <a href="./menu.php"><img id="logo" src="assets\Osbert Pizza-logos_white.png"></a>
        </div>
    </nav>
    <div class="login">
        <div class="loginbox">
            <p class="bottomtext alignleft"><a class="bluelink" href="./cart.php">&#10094;Back to cart</a></p>
            <h3 class="formheader"><strong>Billing Details</strong></h3>
            <form id="loginform" method="post" action="login.php">
                <div class="forminput">
                    <label for="cardname">Cardholder's Name</label><br>
                    <input class="formtext" id="cardname" type="text" name="cardname" placeholder="E.g. John Doe" required>
                </div>
                <div class="forminput">
                    <label for="cardnumber">Card Number</label><br>
                    <input class="formtext" id="card-num" type="text" placeholder="1234 5678 9012 3456" required>
                </div>
                <div class="forminput" id="paymentrow">
                    <div>
                        <label for="cardexpiry">Expiry Date</label><br>
                        <input class="formtext" id="cardexpiry" type="text" name="cardexpiry" placeholder="MM / YY" maxlength="7" required>
                    </div>
                    <div>
                        <label for="cvv">Security Code (CVV)</label><br>
                        <input class="formtext" id="cvv" type="text" name="cvv" placeholder="123" maxlength="3" required>
                    </div>
                </div>
                <div class="forminput">
                    
                </div>
                <input type="button" class="bluebutton" value="Log in">
            </form>
        </div>

    </div>

</body>
</html>