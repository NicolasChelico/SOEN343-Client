import axios from 'axios'

const deleteUser = async (user) => {
    console.log(user);
    try {
      const res = await axios.delete(`http://localhost:8080/User/DeleteUser`, {
        data: { id: user.id } 
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onAddUser = async (newProfile) => {
    return await axios.post(`http://localhost:8080/User/AddUser`, newProfile
    ).then((response) => {
      console.log(response.data);
      return response.data;
    });
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomStrings(length) {
    const randomString1 = generateRandomString(length);
    const randomString2 = generateRandomString(length);
    return [randomString1, randomString2];
}

export {deleteUser, onAddUser, generateRandomStrings}