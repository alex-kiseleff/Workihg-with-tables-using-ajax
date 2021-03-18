<?php
function connectToDataBase($host, $login, $password, $dataBase) {

	$connect_server = mysqli_connect($host, $login, $password, $dataBase);

	if (!$connect_server) {
		showMessage('Не удалось подключиться к базе данных!' . 
		mysqli_connect_error());
		
		exit;
	} else {

		return $connect_server;
	}
}
/*************** */

function showMessage($message = '') {

	print_r($message);
}

/******************** */

function getDataInArray() {

$connect_server = connectToDataBase('localhost', 'root', '', 'my_project_4');
	$array = [];
	$tableName = 'users';

	$query = mysqli_query($connect_server, "SELECT * FROM `$tableName`");
	if (!$query) {
		
		return NULL;
	} else {
		while($row = mysqli_fetch_assoc($query)) {

			$array[] = $row;
		}
		return $array;
	}

}
/******************* */
function setData($firstName, $lastName, $text) {
	
	$connect_server = connectToDataBase('localhost', 'root', '', 'my_project_4');

	$query = mysqli_query($connect_server, "INSERT INTO `users`(`firstName`, `lastName`, `text`) VALUES ('$firstName', '$lastName', '$text')");

}
function deleteRow($id) {
	
	$connect_server = connectToDataBase('localhost', 'root', '', 'my_project_4');

	$query = mysqli_query($connect_server, "DELETE FROM `users` WHERE `ID` IN ($id)");

	if ($query) {
		print_r('okay');
	};
}
/***************** */
function getRowMaxId() {
	
	$connect_server = connectToDataBase('localhost', 'root', '', 'my_project_4');
	
	$query = mysqli_query($connect_server, "SELECT * 
	FROM users ORDER BY ID DESC LIMIT 1");

	$row = mysqli_fetch_assoc($query);
	print_r(json_encode($row));
	return $row;
}
/******************** */
function toSendData() {
	
	$array = getDataInArray();

	print_r(json_encode($array));
}
/********************** */



?>