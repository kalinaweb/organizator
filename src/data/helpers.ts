type GenerateId = () => string;
export const generateId: GenerateId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

type GenerateIdNumber = () => number;
export const generateIdNumber: GenerateIdNumber = () => (
    random(10, 1000)
);

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }