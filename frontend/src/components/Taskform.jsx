import React, { useState } from 'react';

const TaskCreationForm = ({ categories, onCreateTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [categoryColor, setCategoryColor] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title: taskTitle,
            description: taskDescription,
            category: selectedCategory || newCategory,
            color: categoryColor,
            deadline,
        };
        onCreateTask(taskData);
        // Reset form
        setTaskTitle('');
        setTaskDescription('');
        setSelectedCategory('');
        setNewCategory('');
        setCategoryColor('');
        setDeadline('');
    };

    return (
        <form className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-50">Create Task</h2>

            {/* Task Title */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Task Title</label>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                    className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-600"
                />
            </div>

            {/* Task Description */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Description</label>
                <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                    className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-600"
                />
            </div>

            {/* Category Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Select Category</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-600"
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                    <option value="new">Create New Category</option>
                </select>
            </div>

            {/* New Category Name (only visible if new category is selected) */}
            {selectedCategory === 'new' && (
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200">New Category Name</label>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        required
                        className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-600"
                    />
                </div>
            )}

            {/* Category Background Color Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Select Category Color</label>
                <div className="flex flex-wrap gap-4">
                    {['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-orange-500', 'bg-gray-500'].map((color) => (
                        <label key={color} className={`cursor-pointer p-2 rounded-lg ${color} ${categoryColor === color ? 'ring-2 ring-green-600' : ''}`}>
                            <input
                                type="radio"
                                name="categoryColor"
                                value={color}
                                onChange={() => setCategoryColor(color)}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Task Deadline */}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">Deadline</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-600"
                />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200">
                Create Task
            </button>
        </form>
    );
}

export default TaskCreationForm;
