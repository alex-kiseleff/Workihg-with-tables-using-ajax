<?php
//header('Content-type: text/html; charset=utf-8');
//ini_set('display_errors', 1);
//error_reporting(E_ALL);
//define('ROOT', dirname(__FILE__));

include 'lib.php';

function requestResponse() {
	
	if ($_GET['delete'] == 'yes') {
		
		$id = $_GET['id'];
		deleteRow($id);
		return;
	}
	if ($_GET['getTable'] == 'yes') {
		
		toSendData();
		return;
	}
	if ($_GET['add'] == 'yes') {
		
		$firstName = $_GET['firstname'];
		$lastName =  $_GET['lastname'];
		$text = 	 $_GET['text'];
		
		setData($firstName, $lastName, $text);
		getRowMaxId();
		return;
	}
}



requestResponse();



?>