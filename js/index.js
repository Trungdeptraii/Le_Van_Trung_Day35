import apiServer from "./fetch.js";
import { Fetch } from "./fetch.js";

let page = 1, limit = 5;
const tag = (tag)=>document.querySelector(tag);
const loading = tag('.loading');

let posts, heightPosts ;
const heightScroll = window.innerHeight;

// GET data khi scroll tới ngưỡng
window.addEventListener('scroll',async function(){
    console.log(this.scrollY + heightScroll, heightPosts)
    if(this.scrollY + heightScroll >= heightPosts){
        getData()
    }
})
// GET data khi windows load xong
window.addEventListener('load',async function(){
    getData();
})

// Hàm tạo post-item
function createPost(data){
    posts = tag('.posts')
    const postItem = document.createElement('div');
    postItem.className = 'post-item';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    const imgAvt = document.createElement('img');
    imgAvt.className = 'imgAvt';
    imgAvt.src = data.img_avt;
    avatar.append(imgAvt);
    const spanName = document.createElement('span');
    spanName.className = 'name';
    spanName.textContent = `${data.name} ${data.id} `;
    avatar.append(spanName);
    postItem.append(avatar);

    const tags = document.createElement('div');
    tags.className = 'tags';
    postItem.append(tags);
    let lengTags = data.tags.length;
    if(lengTags){
        data.tags.forEach((el, index)=>{
            let span = document.createElement('span');
            span.className = 'tag-item';
            span.textContent = `#${el.toUpperCase()}`
            tags.append(span)
        })
    }
    postItem.append(tags)
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = data.title;
    postItem.append(title);

    const image = document.createElement('div');
    const imgPost = document.createElement('img');
    image.className = 'image';
    imgPost.className = 'imgPost';
    imgPost.src = data.img_post;
    image.append(imgPost);

    const spanDesImg = document.createElement('span');
    spanDesImg.className = 'des-img';
    spanDesImg.innerHTML =  `<i>${data.des_img}</i>`;
    image.append(spanDesImg);
    postItem.append(image);

    const descip = document.createElement('p');
    descip.textContent = data.content;
    postItem.append(descip);
    posts.append(postItem);

}
// Hàm GET API
async function getData(){
    const link = `posts?_page=${page}&&_limit=${limit}`;
    document.body.style.overflow = 'hidden';
    loading.classList.add('active');
    try {
    const result = await Fetch("GET", link);
    if(result.length){
        result.forEach((el)=>{
            createPost(el);
        })
        let time = setTimeout(()=>{ 
            loading.classList.remove('active');
            heightPosts= tag('.posts').clientHeight; 
            page+=1;
            document.body.style.overflow = 'auto';
            clearTimeout(time);
        }, 500)
    }else if(result.length == 0){
        loading.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    } catch (Ex) {
    console.log(Ex)
    }
}
