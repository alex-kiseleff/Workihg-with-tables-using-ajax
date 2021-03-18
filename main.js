"use strict";

getTable.onclick = function () {

	fetch('router.php?getTable=yes')
		.then(data => {
			if (data.status == 200 && data.ok == true) {

				return data.text();
			};
		}).then(data => {

			createTable(data);
		})
}
addRow.onclick = function () {

	let userFirstName = document.querySelector('.firstname');
	let userLastName = document.querySelector('.lastname');
	let userText = document.querySelector('.text');
	let userOut = document.querySelector('.out');

	let firstName = userFirstName.value;
	let lastName = userLastName.value;
	let textVal = userText.value;

	fetch('router.php?add=yes' + '&firstname=' + firstName +
		'&lastname=' + lastName + '&text=' + textVal)
		.then(data => {
			if (data.status == 200 && data.ok == true) {

				return data.text();
			};
		}).then(data => {

			userOut.value = 'Успешно!';

			setTimeout(() => {
				removeClass();
				userOut.value = '';
				userFirstName.value = '';
				userLastName.value = '';
				userText.value = '';
			}, 3000);

			createRowTable(data);
		})
}

delRow.onclick = addEventListener('click', (e) => {

	if (e.target && e.target.className == 'delete') {

		let elemChild = e.target;
		let idDelete = e.target.id;
		let elemParent = elemChild.parentElement;

		fetch('router.php?delete=yes' + '&id=' + idDelete)
			.then(data => {
				if (data.status == 200 && data.ok == true) {

					return data.text();
				};
			}).then(data => {

				if (data == 'okay') {

					elemParent.remove();
				}

			})
	}
})

add.onclick = function addClass() {

	let activeClass = document.querySelector('.block-container__form');

	activeClass.classList.add('active');
}

function removeClass() {

	let activeClass = document.querySelector('.block-container__form');

	activeClass.classList.remove('active');
}

function createTable(arg) {

	let arrTable = JSON.parse(arg);

	let row,
		cell,
		text,
		buttonDelete;
	let table = document.querySelector('.container__table');

	if (!table.hasChildNodes()) {
		row = document.createElement('div');
		row.className = 'row title';
		table.appendChild(row);

		for (let j in arrTable[0]) {

			cell = document.createElement('div');
			cell.className = 'cell';
			text = document.createTextNode(j);
			cell.appendChild(text);
			row.appendChild(cell);
		}

		for (let i = 0; i < arrTable.length; i++) {

			row = document.createElement('div');
			row.className = 'row';
			row.setAttribute('id', (i + 1))
			table.appendChild(row);

			for (let k in arrTable[i]) {

				cell = document.createElement('div');
				cell.className = 'cell';
				text = document.createTextNode(arrTable[i][k]);
				cell.appendChild(text);
				row.appendChild(cell);
			}
			buttonDelete = document.createElement('input');
			buttonDelete.className = 'delete';
			buttonDelete.setAttribute('type', 'button');
			buttonDelete.setAttribute('value', 'Удалить');
			buttonDelete.setAttribute('id', arrTable[i]['id']);
			row.appendChild(buttonDelete);
		}
	} else {

		return;
	}
}
function createRowTable(arg) {

	let arrTable = JSON.parse(arg);

	let row,
		cell,
		text,
		buttonDelete;
	let table = document.querySelector('.container__table');

	if (table.hasChildNodes()) {

		row = document.createElement('div');
		row.className = 'row';
		table.appendChild(row);

		for (let k in arrTable) {

			cell = document.createElement('div');
			cell.className = 'cell';
			text = document.createTextNode(arrTable[k]);
			cell.appendChild(text);
			row.appendChild(cell);
		}
		buttonDelete = document.createElement('input');
		buttonDelete.className = 'delete';
		buttonDelete.setAttribute('type', 'button');
		buttonDelete.setAttribute('value', 'Удалить');
		buttonDelete.setAttribute('id', 'button');
		buttonDelete.setAttribute('onclick', 'deleteRow()');
		row.appendChild(buttonDelete);

	}
}


