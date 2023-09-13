import React from 'react';

const discordUrl = "https://discord.gg/fleekxyz";

const Author = ({
  image,
  name,
  title,
  url,
  communityMember = false,
}: {
  name: string;
  image: string;
  title: string;
  url: string;
  communityMember: boolean,
}): JSX.Element => {
  return (
    <section className='author_card'>
      <div>
        <span className='avatar'><a href={url} target="_blank" alt={name}><img src={image} alt={name} /></a></span>
        <div>
          <span className='name'><a href={url} target="_blank" alt={name}>{name}</a></span>
          <span className='title'>{title}</span>
          <span className='discord'>
            {
              communityMember
                ? "Join our community on"
                : "Got questions? Find us on"
            } <a href={discordUrl} target="_blank">discord!</a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Author;
