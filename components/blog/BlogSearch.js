"use client"
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BlogSearchResults from './BlogSearchResults'; // Importing the UI component from the previous step
import { axiosNormalGet, axiosNormalPost } from '@/libs/axiosHelper';
import { getSearchBlogUrl } from '@/routes/commonRoutes';

function BlogSearch() {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogs = async (searchQuery = '') => {
        setLoading(true);
        setError(null);
        axiosNormalPost(getSearchBlogUrl, { search: searchQuery }).then((response)=>{
            const data = Array.isArray(response.blogs) ? response.blogs : [response.blogs];
            setBlogs(data.filter(Boolean)); // Filters out null values if empty
        }).catch((err)=>{
            console.error("Error fetching blogs:", err);
            setError("Failed to load destinations. Please try again later.");
        }).finally(()=>{
            setLoading(false);
        })
    };

    // 2. Handle Search Submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchBlogs(searchTerm);
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            fetchBlogs(query);
        }, 500), // 500ms delay "moment"
        []
    );

    // 3. Handle the input change natively
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);         // Instantly update the UI input field state
        debouncedSearch(value);      // Wait a moment, then call the search function
    };

    return (
         <div className="sticky-top card border-0 shadow-sm  bg-white" style={{ top: '10%', zIndex: 10 }}>
            <div className="row g-4">
                {/* Left Side: Sticky Search Box Column */}
                <div className="col-12">
                    <form onSubmit={handleSearchSubmit} className="sticky-top border-0 shadow-sm p-4 bg-white" style={{ top: '10%', zIndex: 10 }}>
                        <h4 className="fw-bold mb-1 p-2 h5 ps-2">Quick Search</h4>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control border-end-0 py-2" 
                                placeholder="Search destination..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onInput={handleInputChange}
                            />
                            <button className="btn btn-warning px-3" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </div>
                        {searchTerm && (
                            <button 
                                type="button" 
                                className="badge bg-secondary p-2 mt-2"
                                onClick={() => { setSearchTerm(''); fetchBlogs(''); }}
                            >
                                Clear search
                            </button>
                        )}
                    </form>
                </div>

                {/* Right Side: Dynamic Showcase Grid Column */}
                <div className={`col-12 m-0 ${blogs.length > 0 ? 'p-4 pt-0' : ''} `}>
                    {loading ? (
                        /* Loading Spinner State */
                        <div className="d-flex justify-content-center align-items-center py-5">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        /* Error Alert State */
                        <div className="alert alert-danger border-0 shadow-sm" role="alert">
                            {error}
                        </div>
                    ) : (
                        /* Loaded Results State */
                        blogs.map((item, index)=>(
                            <BlogSearchResults item={item} key={index} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export default BlogSearch;