<?php
    include_once './config.php';

    $conn = mysqli_connect($host, $username, $password, $db_name);

    if (!$conn)
    {
        if ($mode <= ApiMode::Debug)
        {
            echo 'mysqli errno: ' . mysqli_connect_errno() . '<br>';
        }

        sqlDie('Unable to connect to MySQL.<br>');
    }

    /**
     * Escape and clean a string parameter.
     */
    function sqlClean(string $str = null)
    {
        global $conn;

        return mysqli_escape_string($conn, strip_tags($str));
    }

    /**
     * Escape and quote a string parameter.
     */
    function sqlStringParam(string $str = null)
    {
        global $conn;

        return "'" . sqlClean($str) . "'";
    }

    /**
     * Die and print SQL debug information if in debug mode.
     */
    function sqlDie(string $msg = null)
    {
        global $conn, $mode;

        if ($mode <= ApiMode::Debug)
        {
            if ($conn)
                $msg = 'mysqli error: ' . mysqli_error($conn) . '<br>' . $msg;
            else
                $msg = 'mysqli connection error: ' . mysqli_connect_error() . '<br>' . $msg;
        }

        die($msg);
    }
?>