const fs = require("fs");
const { globalServices } = require("../services/globalServices");

const {
  getUserByIdQuery,
  updateImgUserQuery,
} = require("../queries/userQueries");

const deleteImg = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImg = async (type, id, fileName) => {
  let pathAnterior = "";
  switch (type) {
    case "usuarios":
      const userDB = await globalServices(getUserByIdQuery(id));

      if (userDB.recordset.length === 0) {
        return false;
      }
      pathAnterior = `./uploads/usuarios/${userDB.recordset[0].img}`;
      deleteImg(pathAnterior);

      await globalServices(updateImgUserQuery(id, fileName));
      return true;
  }
};

module.exports = {
  updateImg,
};
