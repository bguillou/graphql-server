module.exports = {
  Query: {
    user: () => ({
      id: "my user",
      email: "ohohoho@gmail.com"
    })
  },
  Mutation: {
    addUser: (obj, args) => {
      if (args.error) throw new Error("My Error");
      return {
        id: "new user",
        email: "new@gmail.com"
      };
    }
  },
  User: {
    id() {
      throw new Error("Error ID");
    },
    email() {
      throw new Error("Error Email");
    }
  }
};
