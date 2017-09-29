<?php

#$show_debug = true;

if ($show_debug) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    error_log('Problem Generator is running in debug mode!');
}

require_once dirname(__FILE__).'/DB_CONFIG.php';
require_once dirname(__FILE__).'/core/core.php';
$start_script_timer = microtime_float();
# This is a public API
header('Access-Control-Allow-Origin: *');

$db = new DBHelper($default_database, $default_sql_user, $default_sql_password, $sql_url, $default_table, $db_cols);

$start_script_timer = microtime_float();

$_REQUEST = array_merge($_REQUEST, $_GET, $_POST);

if (!function_exists('elapsed')) {
    function elapsed($start_time = null)
    {

        /***
         * Return the duration since the start time in
         * milliseconds.
         * If no start time is provided, it'll try to use the global
         * variable $start_script_timer
         *
         * @param float $start_time in unix epoch. See http://us1.php.net/microtime
         ***/
        if (!is_numeric($start_time)) {
            global $start_script_timer;
            if (is_numeric($start_script_timer)) {
                $start_time = $start_script_timer;
            } else {
                return false;
            }
        }
        return 1000 * (microtime_float() - (float) $start_time);
    }
                                 }

if (isset($_REQUEST["generator_problem"])) {
    /***
     * Create the problem set as per API parameters
     *
     * @param optional int n -> number of problems to generate. Default 1
     * @param optional str type -> a base64-encoded string representing
     *   the problem type, eg, "Bernoulli’s equation". Default none.
     * @param optional str keyword_like -> a string to fuzzily (LIKE %%
     *   / SOUNDEX ) match against. Default none.
     * @param optional str problem_type -> controlled vocabulary. "random",
     *   "mc", or "long". Default "random".
     * @param optional json config -> Base64 encoded JSON
     *   configuration. Array of objects configurating each of the
     *   other parameters for multiple-problem-type generation.
     ***/
    $defaultConfiguration = array(
        "n" => 1,
        "type" => null,
        "keyword_like" => null,
        "problem_type" => "random",
    );
    if (isset($_REQUEST["config"])) {
        $configuration = smart_decode64($_REQUEST["config"]);
    } else {
        $problem = array(
            "n" => empty($_REQUEST["n"]) ? 1 : intval($_REQUEST["n"]),
            "type" => $_REQUEST["type"],
            "keyword_like" => $_REQUEST["keyword_like"],
            "problem_type" => empty($_REQUEST["problem_type"]) ? "random" : $_REQUEST["problem_type"],
        );
        $configuration = array($problem);
    }
    $problemContents = "";
    foreach ($configuration as $problem) {
        # Check against defaults robustly
        # Sanitize inputs
        # Build latex contents for this problem
    }
    # Finalize latex file
    # Output with right MIME type
    exit();
}

?>
<!doctype html>
<html>
  <head>
    <title>
      Physics Problem Generator
    </title>    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="js/c.min.js" type="text/javascript"></script>
  </head>
  <body class="container-fluid">
    
  </body>
</html>
