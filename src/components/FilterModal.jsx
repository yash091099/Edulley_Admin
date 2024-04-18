import React from 'react';

const FilterModal = ({ isOpen, onClose, onSearchChange, students }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', width: '300px' }}>
                <h2>Filter Students</h2>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    onChange={onSearchChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button onClick={onClose} style={{ padding: '10px 20px' }}>Close</button>
            </div>
        </div>
    );
};

export default FilterModal;
