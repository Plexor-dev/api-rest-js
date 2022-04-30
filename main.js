const URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=80a8df1a-4bd2-4ba5-87ad-0dfde904b3d1';

/*
querystring = [
    '?',
    'limit=3',
    '&order=Desc',
].join('');
*/

// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//      });

async function randomCat() {
    const res = await fetch(URL);
    const data = await res.json();

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

}


randomCat();

const myButton = document.querySelector('button');
myButton.addEventListener('click', randomCat);