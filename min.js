let url = `https://66e88c0bb17821a9d9dd0e96.mockapi.io/Login`;

async function signupHandler(event) {
  event.preventDefault();

  let userName = document.getElementById('userName');
  let userEmail = document.getElementById('userEmail');
  let userPassword = document.getElementById('userPassword');
  let userNameAlert = document.getElementById('userNameAlert');
  let emailAlert = document.getElementById('emailAlert');
  let passwordAlert = document.getElementById('passwordAlert');

  userNameAlert.innerText = '';
  emailAlert.innerText = '';
  passwordAlert.innerText = '';

  if (userName.value.length < 5) {
    userNameAlert.innerText = 'Name should be at least 5 characters';
    userNameAlert.style.color = 'red';
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(userEmail.value)) {
    emailAlert.innerText = 'Email should be valid';
    emailAlert.style.color = 'red';
  }

  if (userPassword.value.length < 8) {
    passwordAlert.innerText = 'Password should be at least 8 characters';
    passwordAlert.style.color = 'red';
  }

  if (
    userName.value.length >= 5 &&
    emailPattern.test(userEmail.value) &&
    userPassword.value.length >= 8
  ) {
    await addUser(userName.value, userEmail.value, userPassword.value);
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';

    window.location.href = './login.html';
  }
}

async function addUser(userName, userEmail, userPassword) {
  let res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  let data = await res.json();
  console.log(data);
}


async function loginHandler(event) {
    event.preventDefault();
  
    let userEmail = document.getElementById('userEmail');
    let userPassword = document.getElementById('userPassword');
    let emailAlert = document.getElementById('emailAlert');
    let passwordAlert = document.getElementById('passwordAlert');
  
    emailAlert.innerText = '';
    passwordAlert.innerText = '';
  
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(userEmail.value)) {
      emailAlert.innerText = 'Email should be valid';
      emailAlert.style.color = 'red';
    }
    if (userPassword.value.length < 8) {
      passwordAlert.innerText = 'Password should be at least 8 characters';
      passwordAlert.style.color = 'red';
    }
  
    if (emailPattern.test(userEmail.value) && userPassword.value.length >= 8) {
      let res = await fetch(url, { method: 'GET' });
      let data = await res.json();
      const userFound = data.find(
        (user) =>
          user.userEmail === userEmail.value &&
          user.userPassword === userPassword.value
      );
      if (userFound) {
        localStorage.setItem('userId', userFound.id);
        localStorage.setItem('userEmail', userFound.userEmail);
        localStorage.setItem('userName', userFound.userName);
  
        userEmail.value = '';
        userPassword.value = '';
        window.location.href = './home.html';
      } else {
        emailAlert.innerText = 'Email not found';
        passwordAlert.innerText = 'Password does not match';
        passwordAlert.style.color = 'red';
        emailAlert.style.color = 'red';
      }
    }
  }