<?php
    ini_set('default_socket_timeout', 5);
    header('Content-type: application/json; charset=utf-8');

    // Prevent caching
    header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    $our_servers = array(
        "dev" => "https://symboxtra.dynu.net",
        "jenkins" => "https://jenkins.symboxtra.dynu.net",
        "wenkins" => "https://wenkins.symboxtra.dynu.net",
        "bigmac" => "https://bigmacjenkins.symboxtra.dynu.net",
        "sympi" => "http://pi.symboxtra.dynu.net/status/builds/latest",
        "symboxtra.tk" => "http://symboxtra.tk",
        "splitsound.tk" => "http://splitsound.tk"
    );
    
    function get_response_code($headers) {
        $res = substr($headers[0], 9, 3);

        if ($res > 300 && $res < 400)
            $res = process_redirect($headers);

        return $res;
    }

    function process_redirect($headers) {
        $headers = array_slice($headers, 1);
        foreach ($headers as $line)
        {
            $matches = array();
            if (preg_match("/HTTP\/[0-9]\.[0-9] (?<code>[0-9]{3})/", $line, $matches) != false)
            {
                $code = $matches['code'];
                if ($code > 300 && $code < 400)
                    $code = process_redirect($headers);
                return $code;
            }
        }
    }
    
    if (isset($_GET['servers']))
    {
        $requested_servers = explode(",", $_GET['servers']);
    }
    else
    {
        $requested_servers = array_keys($our_servers);
    }

    $result = array();
    foreach ($requested_servers as $server)
    {
        $server = strtolower($server);
        if ($our_servers[$server])
        {
            @$headers = get_headers($our_servers[$server]);

            if (!is_null($headers) && $headers && get_response_code($headers) == 200)
            {
                array_push($result, array(
                    $server => "online"
                ));
            }
            else
            {
                array_push($result, array(
                    $server => "offline"
                ));
            }
        }
        else
        {
            array_push($result, array(
                $server => "invalid server name"
            ));
        }
    }
    
    echo json_encode($result, JSON_PRETTY_PRINT);
?>
