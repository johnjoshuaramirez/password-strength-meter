const meter = document.querySelector("#meter");
const password = document.querySelector("#password");
const commentList = document.querySelector("#comment-list");

password.addEventListener("input", update); 
window.addEventListener("load", update);

function update() {
   const weakness = calculate(password.value);

   let strength = 100;
   commentList.innerHTML = "";

   weakness.forEach(weakness => {
      if (weakness == null) return
      strength -= weakness.deduction;

      const message = document.createElement("div");
      message.innerText = weakness.message;
      commentList.appendChild(message)
   });

   meter.style.setProperty("--strength", strength);
}   


function calculate(password) {
   const weakness = [];

   weakness.push(length(password));
   weakness.push(lowercase(password));
   weakness.push(uppercase(password));
   weakness.push(number(password));
   weakness.push(specialCharacter(password));
   weakness.push(repeat(password));

   return weakness
}

function length(password) {
   if (password.length < 6) {
      return {
         message: "Your password is too short",
         deduction: 40
      }
   } else if (password.length < 11) {
      return {
         message: "Your password could be longer",
         deduction: 15
      }
   }
}

function uppercase(password) {
   return character(password, /[A-Z]/g, "uppercase letters");
}

function lowercase(password) {
   return character(password, /[a-z]/g, "lowercase letters");
}

function number(password) {
   return character(password, /[0-9]/g, "numbers");
}

function specialCharacter(password) {
   return character(password, /[^0-9a-zA-Z\s]/g, "special characters");
}

function character(password, regex, character) {
   const matches = password.match(regex) || [];

   if (matches.length === 0) {
      return {
         message: `Your password has no ${character}`,
         deduction: 20
       }
   } else if (matches.length < 4) {
      return {
         message: `Your password could use more ${character}`,
         deduction: 5
      }
   }
}

function repeat(password) {
   const matches = password.match(/(.)\1/g) || [];

   if (matches.length > 0) {
      return {
         message: "Your password has repeat characters",
         deduction: matches.length * 10
      }
   }
} 