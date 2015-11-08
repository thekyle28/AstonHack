<?php
error_reporting(E_ALL);
ini_set("display_errors","On");
//echo file_get_contents("http://enterprise.majestic.com/api/json/?app_api_key=F2ECB6D59382A5EA32DBF15312C286FB&cmd=GetTopics&Item=imgur.com");

$cmd=filter_input(INPUT_GET, "cmd");

$url="http://enterprise.majestic.com/api/json/?app_api_key=F2ECB6D59382A5EA32DBF15312C286FB&cmd=$cmd";

$params=filter_input(INPUT_GET, "params");
$url.="&$params";

echo file_get_contents($url);