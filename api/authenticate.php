<?php
    require_once './auth.php';

    // auth.php queries and finds the valid user if present
    if (!is_null($user))
    {
        $body = json_encode($user, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
        http_response_code(200);
        header('Access-Control-Allow-Origin: *');

        if ($mode <= \ApiMode::Debug)
        {
            header('Content-Type: text/html');
        }
        else
        {
            header('Content-Type: application/json');
            header('Content-Length: ' . strlen($body));
        }

        echo $body;
    }
    else
    {
        // Respond with 401
        requiresAuth();
    }

?>