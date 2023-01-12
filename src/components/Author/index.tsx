import React from 'react';

const Author = ({
  image,
  name,
  title,
  url,
}: {
  name: string;
  image: string;
  title: string;
  url: string;
}): JSX.Element => {
  return (
    <section className='author_card'>
      <div>
        <span><img src={image} alt={name} /></span>
        <div>
          <span className='name'><a href={url} target="_blank">{name}</a></span>
          <span className='title'>{title}</span>
          <span className='discord'>Got questions? Find us on <a href="https://discord.gg/fleekxyz" target="_blank">Discord!</a></span>
        </div>
      </div>
    </section>
  );
};

export default Author;
