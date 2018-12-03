<?php
    require_once 'db.inc.php';

    abstract class AuthLevels {
        const Guest = 1;
        const User = 2;
        const Admin = 3;
        const SuperUser = 4;

        const GuestAbilities = ['list', 'read'];
        const UserAbilities = ['list', 'read', 'update', 'create'];
        const AdminAbilities = ['list', 'read', 'update', 'create', 'delete'];
        const SuperUserAbilities = ['list', 'read', 'update', 'create', 'delete'];

        const GuestRestrictedTables = ['auth_levels', 'users'];
        const UserRestrictedTables = ['auth_levels', 'users'];
        const AdminRestrictedTables = [];
        const SuperUserRestrictedTables = [];
    }

    function requiresAuth()
    {
        header('WWW-Authenticate: Basic realm="Gymnastics-Scoreboard-API"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Please authenticate to perform the requested operation.<br>';
        echo '<a href="/login">Login page</a>';
        exit;
    }

    // Get the request method and associated variables
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method === 'GET')
    {
        $request_vars = $_GET;
    }
    else if ($method === 'POST')
    {
        $request_vars = $_POST;
        if ($request_vars['_method'] === 'PUT')
        {
            $method = 'PUT';
            unset($request_vars['_method']);
        }
    }

    // Construct user query
    $query = "SELECT * FROM users WHERE login = ";
    $query .= sqlStringParam($_SERVER['PHP_AUTH_USER']);

    if ($mode === ApiMode::DebugQueries)
    {
        echo $query . "<br>";
    }

    // Query user table to check auth level
    $result = mysqli_query($conn, $query);
    if (!$result)
    {
        sqlDie("User query failed.");
    }

    // Initialize the global auth level
    $auth = AuthLevels::Guest;

    // Check if the user's password matches
    $row = mysqli_fetch_assoc($result);
    if ($row && isset($_SERVER['PHP_AUTH_PW']) && password_verify($_SERVER['PHP_AUTH_PW'], $row['password']))
    {
        $auth = $row['auth_level'];
    }
    else
    {
        unset($_SERVER['PHP_AUTH_USER']);
        unset($_SERVER['PHP_AUTH_PW']);
    }

    // Check if the user should be rejected
    if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW']))
    {
        // Only require auth if this a mutable request
        if ($method !== 'GET' && $method !== 'OPTIONS')
        {
            requiresAuth();
        }
    }
?>