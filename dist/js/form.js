'use strict';
// Element
const titleEle = document.querySelector('#title');
const desEle = document.querySelector('#description');
const priceEle = document.querySelector('#price');
const imageEle = document.querySelector('#images');

// User Input
async function createProduct(){
    // get value from user input
    const title = titleEle.value
    const description = desEle.value
    const price = Number(priceEle.value)
    const file = imageEle.files[0]
    const imageUrl = await uploadImage(file);

    // create product object
    const product = {
        title,
        price,
        description,
        categoryId: 1,
        images: [imageUrl.location],
    }

    fetch('https://api.escuelajs.co/api/v1/products/',{
        method: "POST",
        body: JSON.stringify(product),
        headers:{
            'content-type': 'application/json'
        }
    }).then((res)=> res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

// Upload image to server
async function uploadImage(file){
    // create form Data
    const formData = new FormData();
    formData.append("file",file);
    // send request to server
    const res = await fetch('https://api.escuelajs.co/api/v1/files/upload',{
        method: "POST",
        body: formData
    });
    return res.json();
}