<?php
define('STICKY_BASE', 'http://stickyapi.alanedwardes.com/');

function get_response($url)
{
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $_REQUEST);
	$result = array(
		'response' => curl_exec($curl),
		'code' => curl_getinfo($curl, CURLINFO_HTTP_CODE)
	);
	curl_close($curl);
	return $result;
}

$result = get_response(STICKY_BASE . @$_REQUEST['method']);
//http_response_code($result['code']);
echo $result['response'];