import React from 'react';

interface Props {
  name: string;
  description: string;
  imageUrl: string;
  first_publish_year: number;
}

export class Card extends React.Component<Props> {
  render(): React.ReactElement {
    const { name, description, imageUrl, first_publish_year } = this.props;
    return (
      <div className="border p-2 rounded shadow bg-white w-[200px] h-[300px]">
        <h3 className="font-bold text-lg text-gray-800 h-[90px] line-clamp-3">
          {name}
        </h3>
        <div className="h-[100px] w-[80px] mx-auto">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={name}
          />
        </div>
        <p className="text-sm text-gray-600">{first_publish_year}</p>
        <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
      </div>
    );
  }
}
