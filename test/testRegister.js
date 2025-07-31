import axios from "axios";

const testRegister = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:3000/api/user/register", {
      name: "יוסי כהן",
      email: "yossi2@example.com",
      password: "123456"
    });

    console.log("✅ Success:");
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.log("❌ Error:", error.response.status);
      console.log(error.response.data);
    } else {
      console.log("❌ Unknown Error:", error.message);
    }
  }
};

testRegister();
