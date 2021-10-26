<?php
    @ $db = new mysqli('localhost', 'f32ee', 'f32ee', 'f32ee');
    if (mysqli_connect_errno()) {
        echo 'Error: Could not connect to database.  Please try again later.';
        exit;
    }
    echo "here";
    $saveme = $db->query("SELECT * FROM prices");
    echo $saveme;

    function dbquery($query){
        $data = array(0);
        echo $query;
        
        echo "here";
        
        while($row = $result->fetch_assoc()){
            array_push($data, $row);
        }
        $result->free();
        echo "here";
        return $data;
    }
    $db->close();
?>