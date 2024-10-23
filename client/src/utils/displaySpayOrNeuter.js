const displaySpayOrNeuter = (pet) => {
  const { sex } = pet;

  if (sex === "female") {
    return "Spayed";
  }
  return "Neutered";
};

export default displaySpayOrNeuter;
