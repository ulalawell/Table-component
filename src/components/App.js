import '../stylesheets/App.css';
import React, {useEffect, useState} from 'react'
import Loader from "react-loader-spinner";
import Table from "./Table";

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const applyFields = (array) => {
        return array.map(function (item, index) {
            return {
                "City": item.location.city,
                "Country": item.location.country,
                "Street": item.location.street.name + " " + item.location.street.number,
                "Postcode": item.location.postcode,
                "Number": item.phone,
                "FullName": item.name.title + " " + item.name.first + " " + item.name.last,
                "Sex": item.gender,
                "Index": index
            };
        })
    }

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=20")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.results);
                    setFilteredItems(applyFields(result.results));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div className="container-loader ">
            <Loader
                type="Puff"
                color="#ff9a4f"
                height={100}
                width={100}
                timeout={3000}
            />
        </div>;
    }

    const handleChange = () => {
        setFilteredItems(applyFields(items))
        const filterInput = document.getElementById("filterInput").value.trim();
        if (filterInput) {
            const newData = applyFields(items).filter((item) => {
                    for (const [, value] of Object.entries(item)) {
                        if (String(value).includes(filterInput)) {
                            return true;
                        }
                    }
                    return false;
                }
            );
            setFilteredItems(newData)
        }
    }

    return (
        <div className="container">
            <input className="container-input" type="text" id="filterInput" placeholder="Enter a filter"
                   onChange={handleChange}/>

            <Table filteredItems={filteredItems}
                   items={items}/>
        </div>
    );
}


