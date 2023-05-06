import {Posts} from '../entities/Post';

export const convertPostDataFromServerToPostCard = (post: Posts) => {
  if (!post) return post;

  return {
    ...post,
    id: post.id,
    author: post.author,
    title: post.title,
    detail: post.detail,
    postTime: post.postTime,
    price: post.price,
    timeUnit: post.timeUnit || 0,
    address: post.address,
    postType: post.postType,
    status: post.status,
    image: post.image,
    isSave: post.isSave || 0,
  };
};
