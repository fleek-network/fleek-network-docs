import React from 'react';

const YoutubePlayer = ({
  source,
  title,
}: {
  source: string;
  title: string;
}): JSX.Element => {
  return (
    <div className="youtube-player">
      <iframe
        src={`${source}?controls=1&modestbranding=1&playsinline=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
};

export default YoutubePlayer;
