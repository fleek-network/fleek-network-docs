import React from 'react';

const YoutubePlayer = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}): JSX.Element => {
  return (
    <div className="youtube-player">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&playsinline=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
};

export default YoutubePlayer;
