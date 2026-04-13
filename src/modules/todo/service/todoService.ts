export const todoService = {
    create(text: string) {
        return {
            id: Date.now(),
            text,
        };
    },
};