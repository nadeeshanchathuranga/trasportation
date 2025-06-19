import React, { useState } from 'react'
import axios from 'axios';

export default function sample() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('image', formData.image);

        try{
            const res = await axios.post('http://localhost:8000', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert(res.data.message);
        } catch(error){
            console.error("Error submitting ", error);
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1>Sample</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />

                <select
                    name=""
                    id=""
                    value={formData.role}
                    onChange={handleChange}
                >

                </select>
            </form>
        </div>
    );
}
