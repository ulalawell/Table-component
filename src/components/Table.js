import React, {useState} from "react";
import "../stylesheets/App.css";
import Modal from "react-modal";



const Table = ({filteredItems}) => {
    const [sortConfig, setSortConfig] = React.useState({});
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);

    }

    React.useMemo(() => {
        let sortedElements = [...filteredItems];
        if (sortConfig !== null) {
            sortedElements.sort((a, b) => {
                if (sortConfig.direction === 'null') {
                    return a.index - b.index;
                }
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
            filteredItems = sortedElements;
            sortedElements = null;
        }
        return sortedElements;
    }, [filteredItems, sortConfig]);


    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };


    const requestSort = key => {
        let direction;
        if (sortConfig.key === key) {
            switch (sortConfig.direction) {
                case 'ascending':
                    direction = 'descending';
                    break;
                case 'descending':
                    direction = 'null';
                    break;
                case 'null':
                    direction = 'ascending';
                    break;
                default:
                    direction = 'null';
            }
        } else {
            direction = 'ascending';
        }

        setSortConfig({key, direction});
    }


    return (
        <div>
            <table className="container-table">
                <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('City')}
                            className={getClassNamesFor('City')}
                        >
                            City
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('Country')}
                            className={getClassNamesFor('Country')}
                        >
                            Country
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('Street')}
                            className={getClassNamesFor('Street')}
                        >
                            Street
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('Postcode')}
                            className={getClassNamesFor('Postcode')}
                        >
                            Postcode
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('Number')}
                            className={getClassNamesFor('Number')}
                        >
                            Number
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('FullName')}
                            className={getClassNamesFor('FullName')}
                        >
                            FullName
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort('Sex')}
                            className={getClassNamesFor('Sex')}
                        >
                            Sex
                        </button>
                    </th>
                </tr>
                </thead>

                <tbody>
                {filteredItems.map((item) => (
                    <tr key={item.index + item.FullName} onClick={toggleModal}>
                        <td>{item.City}</td>
                        <td>{item.Country}</td>
                        <td>{item.Street}</td>
                        <td>{item.Postcode}</td>
                        <td>{item.Number}</td>
                        <td>{item.FullName}</td>
                        <td>{item.Sex}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*<Modal*/}
            {/*    isOpen={isOpen}*/}
            {/*    onRequestClose={toggleModal}*/}
            {/*    contentLabel="My dialog"*/}
            {/*    className="mymodal"*/}
            {/*    overlayClassName="myoverlay"*/}
            {/*    closeTimeoutMS={500}*/}
            {/*>*/}

            {/*    <button onClick={toggleModal}>Close modal</button>*/}
            {/*</Modal>*/}
        </div>
    )
        ;
};


export default Table;
