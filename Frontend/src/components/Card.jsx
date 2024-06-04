import React from 'react';
import PropTypes from 'prop-types';

const dummy ={
    page: 1,
    results: [
        {
            userId: 1,
            id: 1,
            cat_name: "meong",
            description: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            cat_image: "https://res.cloudinary.com/dramhnsj2/image/upload/v1717481867/default/jy9bmlndxr2mxt1wpg9x.jpg",
        },
        {
            userId: 1,
            id: 2,
            cat_name: "meong",
            description: "aaaaaaaaaaaaaa",
            cat_image: "https://res.cloudinary.com/dramhnsj2/image/upload/v1717481867/default/jy9bmlndxr2mxt1wpg9x.jpg",
        },
        {
            userId: 1,
            id: 3,
            cat_name: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            description: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
            cat_image: "https://res.cloudinary.com/dramhnsj2/image/upload/v1717481867/default/jy9bmlndxr2mxt1wpg9x.jpg",
        },
        {
            userId: 1,
            id: 4,
            cat_name: "eum et est occaecati",
            description: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
            cat_image: "https://res.cloudinary.com/dramhnsj2/image/upload/v1717481867/default/jy9bmlndxr2mxt1wpg9x.jpg",
        },
        {
            userId: 1,
            id: 5,
            cat_name: "nesciunt quas odio",
            description: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
            cat_image: "https://res.cloudinary.com/dramhnsj2/image/upload/v1717481867/default/jy9bmlndxr2mxt1wpg9x.jpg",
        },
    ],
};

const Card = ({cat_image, cat_name, description}) => {
    return (
        <div className="bg-Primary_dark rounded-lg mt-4 w-[900px] mx-auto">
            <div className="flex">
                <img className = "rounded-xl w-[250px] m-2" src={cat_image} alt={cat_name} />
                <div className="card-body no-underline">
                    <h2 className="card-title text-[20pt] font-bold text-white">{cat_name}</h2>
                    <p className='text-[15pt] font-normal text-[#FFFFFF]'>{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary bg-Third_dark rounded-md p-1 mt-2 hover:scale-[102%] transition-all">Know more about me</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    cat_image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cat_name: PropTypes.string.isRequired
}

const CardGrid = () => {
    return (
        <div className="w-[100%] mt-4 p-4">
            <div className="flex flex-wrap px-3 justify-between">
                {dummy.results.map((item) => (
                    <Card key={item.id} cat_name={item.cat_name} description={item.description} cat_image={item.cat_image} />
                ))}
            </div>
        </div>
    );
};

export default CardGrid;