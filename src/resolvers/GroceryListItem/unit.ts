const resolver = async ({ unit }) => {
    if (unit === null) {
        return null;
    }

    const unitTrimmed = unit.trim();

    if (unitTrimmed === '') {
        return null;
    }

    return unitTrimmed;
};

export default resolver;
