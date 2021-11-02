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


?>