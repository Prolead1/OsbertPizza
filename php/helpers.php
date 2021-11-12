<?php 
function logout(){
    setcookie("loginstatus", "",time() - 3600, "./login.php");
    setcookie("location", "", time() - 3600, "./menu.php");
    setcookie("index", "", time() - 3600, "./menu.php");
    setcookie("loginuname", "", time() - 3600, "./login.php");
    setcookie("numitems", "", time() - 3600, "./menu.php");
    setcookie("paymentstatus", "", time() - 3600, "./payment.php");
    header("Location: hero.html");
}

function getdata($query){
    $db = new mysqli('localhost', 'f32ee', 'f32ee', 'f32ee');
    if (mysqli_connect_errno()) {
        echo 'Error: Could not connect to database.  Please try again later.';
        exit;
    }
    $result = $db->query($query);
    $data = "[";
    while($row = $result->fetch_assoc()){
        $temp = "{";
        foreach($row as $key => $val){
            $temp = $temp.'"'.$key.'": "'.$val.'", ';
        }
        $temp = substr($temp, 0, $temp.length-2);
        $data = $data.$temp."}, ";
    }
    $data = substr($data, 0, $data.length-2);
    return $data."]";
}

function loginstatus(){
    if(isset($_COOKIE["loginstatus"])) {
        if ($_COOKIE["loginstatus"] != "True"){
            setcookie("loginstatus","", time()+ 86400);
            header('Location: ./hero.html');
            die();
        }
    }else{
        header('Location: ./hero.html');
        die();
    }
}

function dbinsert($query){
    $db = new mysqli('localhost', 'f32ee', 'f32ee', 'f32ee');
    if (mysqli_connect_errno()) {
        echo 'Error: Could not connect to database.  Please try again later.';
        exit;
    }
    $db->query($query);
}
function data_parse($string){
    $result = Array();
    $string = substr($string, 1, -1);
    $string = explode("}, ", $string);
    $string[strlen($string)-1] = substr($string[strlen($string)-1], 0, -1);
    foreach($string as $item){
        $item = substr($item, 1, -1);
        $item = explode(", ", $item);
        foreach($item as $elem){
            $elem = explode(": ", $elem);
            $test = substr($elem[1], 0, 1);
            if ($test == "["){
                $elem[1] = substr($elem[1], 1, -1);
                $elem[1] = explode(",", $elem[1]);
            }
            $result[$elem[0]] = $elem[1];
        }
    }
    return $result;
}
function checkusername($username){
    return preg_match("/(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/", $username);
}

function checkpassword($password){
    return preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/",$password);
}
?>