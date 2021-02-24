import React from "react";

export const AddForm = ({onSubmit}) => {
	const [addEnabled, setAddEnabled] = React.useState(false);
	const [id, setId] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [phone, setPhone] = React.useState("");
	return (
		<div className="addUser">
			{!addEnabled && <button onClick={() => setAddEnabled(true)}>Добавить</button>}
			{addEnabled && <>
				<span>ID:&nbsp;
					<input onChange={e => setId(e.target.value)} value={id}/></span>
				<span>Имя:&nbsp;
					<input onChange={e => setFirstName(e.target.value)} value={firstName}/></span>
				<span>Фамилия:&nbsp;
					<input onChange={e => setLastName(e.target.value)} value={lastName}/></span>
				<span>E-mail:&nbsp;
					<input onChange={e => setEmail(e.target.value)}
					       placeholder={`yourmail@email.com`}
					       value={email}/></span>
				<span>Телефон:&nbsp;
					<input onChange={e => setPhone(e.target.value)}
					       placeholder={`(999)999-9999`}
					       value={phone}/></span>
				<button disabled={
					!id ||
					!firstName ||
					!lastName ||
					!email ||
					!phone
				} onClick={() => {
					if(Number.isNaN(Number(id))){
						alert("Неверно введён id");
						return;
					}
					if(!/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/.test(phone)){
						alert("Неверно введён телефон");
						return;
					}
					if(!/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(email)){
						alert("Неверно введён e-mail");
						return;
					}
						onSubmit({
						id: Number(id), firstName, lastName, email, phone
					})}
				}>
					Добавить в таблицу
				</button>
			</>}
		</div>
	)
}