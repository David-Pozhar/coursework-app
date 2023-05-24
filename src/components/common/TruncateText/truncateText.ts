export const truncateText = (text: string): string => {
    if (text.length <= 40) {
      return text;
    } else {
      return text.substring(0, 40) + '...';
    }
};