import React from 'react';

export function TaskActions(): JSX.Element {
    return (
        <div className="flex justify-center space-x-3">
            <button
                onClick={() => console.log('Create pressed')}
                className="my-2 p-1 bg-green-400 rounded-md"
            >
                Create
            </button>
            <button
                onClick={() => console.log('Delete pressed')}
                className="my-2 p-1 bg-red-400 rounded-md"
            >
                Delete
            </button>
        </div>
    );
}
