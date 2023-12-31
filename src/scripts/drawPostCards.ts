import { database } from './getFirebaseDB'
import getPostCards from './getPostCards'

interface PostCard {
  image: string
  title: string
  caption: string
  autorImg: string
  autorName: string
  postDate: string
  fullImg: string
  comments: string[]
}

export default async function drawPosts() {
  const postCards = (await getPostCards(database)) as unknown as PostCard[]
  const posts = document.querySelector('.news') as HTMLElement
  let allPostsString = ''

  postCards.forEach((element, index) => {
    const postHTML = `<a href="post.html?${index}"><div class="news_card">
    <img src="${element.image}" alt="" class="news_cardImg" />
    <div class="news_cardContent">
      <h3 class="news_cardTitle">
      ${element.title}
      </h3>
      <p class="news_cardCaption">
      ${element.caption}
      </p>
      <div class="news_cardAutor">
        <img
          src="${element.autorImg}"
          alt=""
          class="news_cardAvatar"
        />
        <p class="news_cardName">${element.autorName}</p>
        <p class="news_cardDate">${element.postDate}</p>
      </div>
    </div>
  </div></a>`

    allPostsString = `${allPostsString} ${postHTML}`
  })

  if (posts !== null) {
    posts.innerHTML = allPostsString
  }
}
