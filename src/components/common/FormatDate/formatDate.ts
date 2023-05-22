export const formatDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    return formattedDate;
}