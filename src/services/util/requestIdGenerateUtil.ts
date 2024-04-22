const generateRequestId = (): string => {
    const randomNumber = Math.floor(Math.random() * 10000000000);
    const timestamp = new Date().getTime();
    return `${timestamp}${randomNumber}`;
  };
  export { generateRequestId };
  