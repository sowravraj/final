import { useEffect, useState } from 'react';


const apiURL = "https://venderback-2.onrender.com";

const List = () => {
    const [lists, setLists] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to fetch all lists from the API
    const getList = () => {
        fetch(apiURL + "/lists")
            .then((res) => res.json())
            .then((res) => setLists(res))
            .catch((err) => {
                console.error("Fetch error:", err);
            });
    }

    // Fetch the list data on initial component load
    useEffect(() => {
        getList();
    }, []);

    // Filtered lists based on search term
    const filteredLists = lists.filter(list => 
        list.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Header section */}
            <div className="p-3 bg-dark text-light">
                <h1 className="pr-5 pb-2">Pulse Picks</h1>
                <h6 className="">Handpicked Trends, Just for You!</h6>
            </div>

            {/* Main content section */}
            <div className="container mt-3">
                {/* Search input */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Product list */}
                <h3 className="mb-3">Product's List</h3>
                <div>
                    {/* Conditional rendering based on filtered lists */}
                    {filteredLists.length === 0 ? (
                        <p className="text-muted">No items found.</p>
                    ) : (
                        <ul className='list-group'>
                            {filteredLists.map((list) => (
                                <li key={list._id} className="list-group-item d-flex justify-content-between align-items-center my-2 gap-2" style={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '0.5rem' }}>
                                    {/* Product title */}
                                    <span className='fw-bold' style={{ minWidth: '60%' }}>{list.title}</span>
                                    
                                    {/* Buying link */}
                                    <a href={list.buyingLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none btn btn-primary btn-sm" style={{ minWidth: '20%', color: 'white', backgroundColor: '#007bf1', border: 'none' }}>Purchase Here</a>
                                    
                                    {/* Review link with updated color */}
                                    <a href={list.reviewLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none btn btn-info btn-sm pl-5"  style={{ minWidth: '20%', color: 'white', backgroundColor: '#138400', border: 'none' }}>Checkout Our Reviews</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default List;
