/**
 * This function, is specifically intended for development purposes to seed initial user data into the database. 
 * It is not designed for production use and serves as a provisional utility to facilitate API testing and development. 
 * In future versions, this function will likely be replaced or removed as part of the production-ready implementation.
 */
async function loadSeedOfUsers() {
    try {
        const USER_DATA = await ObtainSeedData();
        USER_DATA.forEach(async (user) => {
            await User.create({
                id: generateID(),
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                email: user.email,
                password: Hash.hashPassword('123456')
            });
        });

        return USER_DATA;
    } catch (error) {
        console.error('----------------------------\n')
        console.error('Error loading seed data:', error.message);
        throw new Error('Error loading seed data: ' + error.message);
    }
}