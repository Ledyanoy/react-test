console.log("hello world");

const getResource = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`fetch Error: ${url} recieved ${response.status}`);
  }
  const body = await response.json();
  return body;
};

getResource("https://swapi.co/api/people/1/")
  .then(body => {
    console.log(body);
  })
  .catch(error => {
    console.error("fetch Error:", error);
  });
