<?php
require "./php/helpers.php";
loginstatus();
$order = (json_decode($_COOKIE["numitems"]));
$flag = true;
foreach ($order as $key => $value) {
    if (!$value == ""){
        $flag = false;
    }
}

if ($flag) {
    header('Location: ./menu.php');
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //     // collect value of input field
        $location = htmlspecialchars($_COOKIE["location"]);
        var_dump($location);
        $cardname = htmlspecialchars($_POST["cardname"]);
        $cardnumber = str_replace(array(" ", "-", "\n", "\r"),"",htmlspecialchars($_POST["cardnumber"]));
        $cardexpiry = str_replace("\\","/",htmlspecialchars($_POST["cardexpiry"]));
        $cvv = htmlspecialchars($_POST["cvv"]);
        $order = htmlspecialchars($_COOKIE["numitems"]);
        $result = getdata("SELECT * FROM logins WHERE username ='".htmlspecialchars($_COOKIE['loginuname'])."'");
        $row = (array)json_decode($result)[0];
        $userid = (int)$row['userid'];
        $result = getdata("SELECT * FROM orders ORDER BY paymentid DESC");
        $row = (array)json_decode($result)[0];
        $paymentid = (int)($row['paymentid']);
        $paymentid += 1;
        $valid = checkdetails($cardname, $cardnumber, $cardexpiry, $cvv);
        if ($valid === true) {
            $query = "INSERT INTO payments VALUES ('".$paymentid."', '".$userid."', '".$cardname."', '".$cardnumber."', '".$cardexpiry."', '".$cvv."');";
            dbinsert($query);
            $query = "INSERT INTO orders VALUES ('".$paymentid."', '".$order."', '".$userid."', '".$location."', 'Received Order');";
            dbinsert($query);
            echo $query;
            setcookie("paymentstatus","Successful",time() + 86400);
            setcookie("numitems","", time() + 86400);
            header("Location: ./status.php");
        } else {
            setcookie("paymentstatus",$valid,time() + 86400);
            header('Location: ./payment.php');
        }
}
function checkdetails($cardname, $cardnumber, $cardexpiry, $cvv){
    $valid = True;
    if (!checkname($cardname)){
        $valid = "Card Name";
    }
    
    if (!checkcard($cardnumber)) {
        $valid = "Card Number";
    }
    if (!checkexp($cardexpiry)){
        $valid = "Card Expiry";
    }
    if (!checkcvv($cvv)){
        $valid= "CVV"; 
    }
    return $valid;
}

function checkname($cardname){
    return preg_match("/[a-zA-z]*$/", $cardname);
}
function checkcard($cardnumber){
    return preg_match("/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/", $cardnumber);
}
function checkcvv($cvv){
    return preg_match("/^[0-9]{3}$/", $cvv);
}
function checkexp($cardexpiry){
    return preg_match("/^(0[1-9]|1[0-2])\/?([0-9]{2})$/", $cardexpiry);
}

    ?>