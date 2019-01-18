const hostname = 'http://localhost:3001';
const log = (person, id) => {
  if (person) {
    const { name, age } = person;
    console.log(`name: ${name}, age: ${age}`);
  }
};

const writeResult = (result, id) => {
  if (result && id) {
    document.getElementById(id).textContent = result;
  }
};

// 1. cors forbidden, with no Access-Control-Allow-Origin
fetch(`${hostname}/cors-forbidden`)
  .then(res => res.json())
  .then(log)
  .catch(err => writeResult(err, 'cors-forbidden'));

// 2. cors forbidden, with mode: no-cors
fetch(`${hostname}/cors-forbidden`, { mode: 'no-cors' })
  .then(res => res.json())
  .then(log)
  .catch(err => writeResult(err, 'with-no-cors'));

// 3. cors permit
fetch(`${hostname}/cors-permit`)
  .then(res => res.json())
  .then(log);

// 4. cors preflight trigger
fetch(`${hostname}/trigger-preflight`, {
  headers: { 'Content-Type': 'application/json' }
})
  .then(res => res.json())
  .then(log);

// 5. cors preflight trigger with custom header
fetch(`${hostname}/trigger-preflight`, {
  headers: { 'X-Access-Token': 'dontbeserious' }
})
  .then(res => res.json())
  .then(log);

fetch(`${hostname}/cookie`, { credentials: 'include' });

setTimeout(() => {
  fetch(`${hostname}/cookie`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
}, 1400);
