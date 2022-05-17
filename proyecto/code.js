const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = '80a8df1a-4bd2-4ba5-87ad-0dfde904b3d1'

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOURITES_DELETE = id => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';


const spanError = document.getElementById('error');



//? GETTING DATA FROM API

async function randomCat() {

    try {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    const status = res.status;

    if(status !== 200) {

        console.error(`Error ${status}`);
        spanError.innerHTML = `Error ${status} ${data.message}`;

    } else {

        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        //const img3 = document.getElementById('img3');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        //img3.src = data[2].url;8
        // console.log(data);


        btn1.onclick = (id) => saveFavouriteCat(data[0].id);

        btn2.onclick = (id) => saveFavouriteCat(data[1].id);

    }
    } catch {
        console.error('Error ');
    }

    

}



//*LOAD FAVOURITES

async function loadFavouriteCat() {
    const res = await fetch(API_URL_FAVOURITES,{
        method: 'GET',
        headers: {
            'X-API-KEY': '80a8df1a-4bd2-4ba5-87ad-0dfde904b3d1'
        }});
    const data = await res.json();

    console.log('Favourite ');
    console.log(data);

    if(res.status !== 200) {

        console.error(`Error ${res.status} ${data.message}`);
        spanError.innerHTML = `Error ${res.status} ${data.message}`;

    } else {
        const sectionDiv = document.getElementById('favoriteCat')
        sectionDiv.innerHTML = '';
        data.forEach(cat => { 
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Delete');

            
            img.src = cat.image.url;
            btn.appendChild(btnText);
            // btn.addEventListener("click", deleteFavouriteCat(cat.id));
            btn.onclick = () => deleteFavouriteCat(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            sectionDiv.appendChild(article);

            
            // cat.image_url

            
        });
    }
}




//*POST

async function saveFavouriteCat(id) {
    const {data, status} = await api.post('/favourites',{ //traer la variable api que viene con axios 
        image_id: id,
    });


    //     const res = await fetch(API_URL_FAVOURITES, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-API-KEY': '80a8df1a-4bd2-4ba5-87ad-0dfde904b3d1'
//         },
//         body: JSON.stringify({
//             image_id: id
//     }),
// });

    console.log('post ');
    //console.log(res);

    //const data = await res.json();

    if(status !== 200) {
        console.error(`Error ${status} ${data.message}`);
        spanError.innerHTML = `Error ${res.status} ${data.message}`;
    } else {
        console.log('Se guardo el gatito');
        loadFavouriteCat();
    }
}






//!DELETE

async function deleteFavouriteCat(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': '80a8df1a-4bd2-4ba5-87ad-0dfde904b3d1'
        }
});


    const data = await res.json();

    if(res.status !== 200) {

        console.error(`Error ${res.status} ${data.message}`);
        spanError.innerHTML = `Error ${res.status} ${data.message}`;

    } else {
        console.log('Se elimino el gatito');
        loadFavouriteCat();
    }
}

async function uploadCatImage() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);



    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data', //en este caso no es necesario indicarlo
            'X-API-KEY': '80a8df1a-4bd2-4ba5-87ad-0dfde904b3d1'
    },
    body: formData,
    });

    const data = await res.json();


    if(res.status !== 201) {
        console.error(`Error ${res.status} ${data.message}`);
        spanError.innerHTML = `Error ${res.status} ${data.message}`;
    } else {
        console.log('Se subio el gatito');
        console.log({data});
        console.log(data.url);


        
        saveFavouriteCat(data.id);
    }
    }

    function miniatura() {
        const form = document.getElementById('uploadingForm')
        const formData = new FormData(form)
        //usamos el FileReader para sacar la información del archivo del formData
        const reader = new FileReader();
    
    //Este código es para borrar la miniatura anterior al actualizar el form.
        if (form.children.length === 3) {
            const preview = document.getElementById("preview")
            form.removeChild(preview)
        }
    //aquí sucede la magia, el reader lee los datos del form.
        reader.readAsDataURL(formData.get('file'))
    
    //Éste código es para cuando termine de leer la info de la form, cree una imagen miniatura de lo que leyó el form.
        reader.onload = () => {
            const previewImage = document.createElement('img')
            previewImage.id = "preview"
            previewImage.className = "preview-class"
            previewImage.width = 50
            previewImage.src = reader.result
            form.appendChild(previewImage);
        }
    
    }





randomCat();
loadFavouriteCat();

const myButton = document.querySelector('#my-btn');
myButton.addEventListener('click', randomCat);