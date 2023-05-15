import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Category', CategorySchema);
